package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MyfirstappApp;
import com.mycompany.myapp.domain.Wishlist;
import com.mycompany.myapp.repository.WishlistRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link WishlistResource} REST controller.
 */
@SpringBootTest(classes = MyfirstappApp.class)
public class WishlistResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restWishlistMockMvc;

    private Wishlist wishlist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WishlistResource wishlistResource = new WishlistResource(wishlistRepository);
        this.restWishlistMockMvc = MockMvcBuilders.standaloneSetup(wishlistResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Wishlist createEntity(EntityManager em) {
        Wishlist wishlist = new Wishlist()
            .name(DEFAULT_NAME)
            .date(DEFAULT_DATE);
        return wishlist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Wishlist createUpdatedEntity(EntityManager em) {
        Wishlist wishlist = new Wishlist()
            .name(UPDATED_NAME)
            .date(UPDATED_DATE);
        return wishlist;
    }

    @BeforeEach
    public void initTest() {
        wishlist = createEntity(em);
    }

    @Test
    @Transactional
    public void createWishlist() throws Exception {
        int databaseSizeBeforeCreate = wishlistRepository.findAll().size();

        // Create the Wishlist
        restWishlistMockMvc.perform(post("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isCreated());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeCreate + 1);
        Wishlist testWishlist = wishlistList.get(wishlistList.size() - 1);
        assertThat(testWishlist.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWishlist.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createWishlistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wishlistRepository.findAll().size();

        // Create the Wishlist with an existing ID
        wishlist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWishlistMockMvc.perform(post("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isBadRequest());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllWishlists() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        // Get all the wishlistList
        restWishlistMockMvc.perform(get("/api/wishlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wishlist.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        // Get the wishlist
        restWishlistMockMvc.perform(get("/api/wishlists/{id}", wishlist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wishlist.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWishlist() throws Exception {
        // Get the wishlist
        restWishlistMockMvc.perform(get("/api/wishlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        int databaseSizeBeforeUpdate = wishlistRepository.findAll().size();

        // Update the wishlist
        Wishlist updatedWishlist = wishlistRepository.findById(wishlist.getId()).get();
        // Disconnect from session so that the updates on updatedWishlist are not directly saved in db
        em.detach(updatedWishlist);
        updatedWishlist
            .name(UPDATED_NAME)
            .date(UPDATED_DATE);

        restWishlistMockMvc.perform(put("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWishlist)))
            .andExpect(status().isOk());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeUpdate);
        Wishlist testWishlist = wishlistList.get(wishlistList.size() - 1);
        assertThat(testWishlist.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWishlist.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWishlist() throws Exception {
        int databaseSizeBeforeUpdate = wishlistRepository.findAll().size();

        // Create the Wishlist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWishlistMockMvc.perform(put("/api/wishlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wishlist)))
            .andExpect(status().isBadRequest());

        // Validate the Wishlist in the database
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWishlist() throws Exception {
        // Initialize the database
        wishlistRepository.saveAndFlush(wishlist);

        int databaseSizeBeforeDelete = wishlistRepository.findAll().size();

        // Delete the wishlist
        restWishlistMockMvc.perform(delete("/api/wishlists/{id}", wishlist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Wishlist> wishlistList = wishlistRepository.findAll();
        assertThat(wishlistList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Wishlist.class);
        Wishlist wishlist1 = new Wishlist();
        wishlist1.setId(1L);
        Wishlist wishlist2 = new Wishlist();
        wishlist2.setId(wishlist1.getId());
        assertThat(wishlist1).isEqualTo(wishlist2);
        wishlist2.setId(2L);
        assertThat(wishlist1).isNotEqualTo(wishlist2);
        wishlist1.setId(null);
        assertThat(wishlist1).isNotEqualTo(wishlist2);
    }
}

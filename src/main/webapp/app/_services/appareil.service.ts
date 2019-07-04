import { Subject } from 'rxjs';

export class AppareilService {
  appareilSubject = new Subject<any[]>();
  STR_ON: string = 'allumé';
  STR_OFF: string = 'éteint';

  private appareils = [
    {
      id: 1,
      name: 'machine à laver',
      status: this.STR_ON
    },

    {
      id: 2,
      name: 'Ordinateur',
      status: this.STR_ON
    },

    {
      id: 3,
      name: 'Télévision',
      status: this.STR_OFF
    }
  ];

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(appareilObject => {
      return appareilObject.id === id;
    });
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = this.STR_ON;
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = this.STR_OFF;
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = this.STR_ON;
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = this.STR_OFF;
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    if (this.appareils.length > 0) appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    else appareilObject.id = 0;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
}

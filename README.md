<h1 align="center">Tech4All</h1>
<p align="center">
<img width="207" height="202" alt="Screenshot (78)" src="https://github.com/user-attachments/assets/a07d155a-f015-4069-9433-ec4df2a4a9d1" />
</p>
La questione relativa all'acquisizione delle opportune competenze digitali da parte dei cittadini
italiani è un tema focale per l’AGID, la quale ha deciso, ai fini di arrivare all'ottenimento del
suddetto obiettivo, di avvalersi dell’applicazione web Tech4All. Questo sistema intende
supportare l’alfabetizzazione digitale di cittadini e lavoratori, facilitando l'accesso alle tecnologie
digitali per tutti, con un particolare focus su persone meno avvezze all'uso di strumenti digitali, di
cui gli anziani rappresentano la fetta più ampia.

## Obiettivi

1. Soddisfare i criteri del PNRR; 
2. Sviluppo di una piattaforma web intuitiva; 
3. accesso rapido alle risorse;
4. promuovere l'inclusione digitale;
5. incentivare l'uso autonomo delle risorse digitali.

## Autori 
Ferdinando Boccia - _Project Manager_ 

Domenico D'Antuono - _Project Manager_ 

Silvana De Martino - _Team Member_

Luigi Nasta - _Team Member_

Giuseppe Staiano - _Team Member_

Arcangelo Ciaramella - _Team Member_

Marco Capuano - _Team Member_

Giovanni Salsano  - _Team Member_

Giovanni Esposito - _Team Member_

Giovanni Cerchia - _Team Member_



## Istruzioni per l'installazione e funzionamento della web app
### Lato Front-End

```bash
npm install
```

---

### Lato Back-End

```bash
npm install
```

#### Per far funzionare il db

- Copiare e incollare su MySQL, runnare il codice su MySQL e creare il db.
- Creare (o inserire in) un file di nome ".env" in server inserendo i dati di accesso del proprio DB nelle seguenti variabili:

  ```env
  DB_HOST=""
  DB_USER=""
  DB_PASSWORD=""
  DB_NAME=""
  ```

- In caso di tentativi di test inserire il file nella cartella "test" in server.
- Per runnare solo la cartella indicata scrivere nel terminare apposito : npx ts-node nomeFileTest.ts e premere invio.

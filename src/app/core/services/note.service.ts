import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import { first, map } from 'rxjs/operators';
import { Note } from '../models/note';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  _notes = new Subject();
  $notes = this._notes.asObservable();
  _note = new Subject();
  $note = this._note.asObservable();

  constructor(
    private userS: UserService,
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-list-notes', (event, arg) => {
      this._notes.next(arg);
    });
    this.electron.ipcRenderer.on('reply-add-note', (event, arg) => {
      this._note.next(arg);
    });
  }

  listNotes(filter?: {}, sort?: string): Observable<Note[]> {
    const data = {...filter, sort, userId: this.userS.get().id};
    this.electron.ipcRenderer.send('list-notes', data);
    return this.$notes.pipe(first(),map((notes: Note[]) => {
      return notes;
    }));
  }
  
  addNote(note, read: boolean): Observable<Note> {
    if (!read) {
      const nte = {
        userId : this.userS.get().id,
        typeRel: note.typeRel,
        title: note.title,
        description: note.description,
        date: note.date,
        type: note.type
      };
      this.electron.ipcRenderer.send('add-note', nte);
    }
    return this.$note.pipe(map((note: Note) => {
      return note[0];
    }));
  }

}

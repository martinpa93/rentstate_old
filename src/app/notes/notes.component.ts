import { Component, OnInit } from '@angular/core';
import { notes } from 'src/assets/mocks/notes';
import { Note } from '../core/models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

notes: Note[] = notes;
selectedNote: Note;
start;
end;

  constructor() { }

  ngOnInit(): void {
  }

  changeNote(note: Note) {
    this.selectedNote = note;
  }
}

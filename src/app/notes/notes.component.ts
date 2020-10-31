import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { notes } from 'src/assets/mocks/notes';
import { Note } from '../core/models/note';
import { NotesService } from '../core/services/note.service';
import { FilterNotesComponent } from './filter-notes/filter-notes.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

notes: Note[] = notes;
notesPage: Note[];
selectedNote: Note;
subscription: Subscription = new Subscription();
page = {
  pageIndex: 0,
  pageSize: 5
};
filter = {
  typeRel: null,
  relId: null, 
  start: null,
  end: null
};
sort: string;
loadingN: boolean;

  constructor(
    private notesS: NotesService,
    private dialog: MatDialog,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadingN = true;
    this.notesS.listNotes().subscribe((res: Note[]) => {
      this.zone.run(() => {
        this.notes = res;
        this.changeData();
        this.loadingN = false;
      });
    });
    this.subscription.add(this.notesS.addNote(null, true).subscribe((res) => {
      this.loadingN = true;
      this.notesS.listNotes(this.filter, this.sort).subscribe((res: Note[]) => {
        this.zone.run(() => {
          this.page.pageIndex = 0;
          this.notes = res;
          this.changeData();
          this.loadingN = false;
        });
      });
    }));
  }

  changeNote(note: Note) {
    this.selectedNote = note;
  }

  changePage(event) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.changeData();
  }

  changeData() {
    if (!this.notes) { return; }
    this.notesPage = this.notes
      .filter((res: Note, index) => 
        index >= this.page.pageIndex * this.page.pageSize && index+1 <= (this.page.pageIndex+1) * this.page.pageSize
    );
  }
  
  changeSort(filter, sort) {
    this.sort = sort;
    this.notesS.listNotes(filter, sort).subscribe((res: Note[]) => {
      this.page.pageIndex = 0;
      this.notes = res;
      this.changeData();
    });
  }

  openFilter() {
    const filter = { ...this.filter };
    const dialogRef = this.dialog.open(FilterNotesComponent, { data: filter });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.filter = result;
        this.filterData(this.filter, this.sort);
      }
    }); 
  }

  filterData(filter?, sort?) {
    this.notesS.listNotes(filter, sort).subscribe((res: Note[]) => {
      this.page.pageIndex = 0;
      this.notes = res;
      this.changeData();
    });
  }

}

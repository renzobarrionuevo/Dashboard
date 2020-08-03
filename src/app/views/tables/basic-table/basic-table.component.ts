import {Component, HostListener, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent {
    @ViewChild(MdbTableDirective, {static: false}) mdbTable: MdbTableDirective;
    elements: any = [];
    headElements = ['ID', 'First', 'Last', 'Handle'];
    searchText: string = '';
    previous: string;

    constructor() {
    }

    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit() {
        for (let i = 1; i <= 10; i++) {
            this.elements.push({
                id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i
            });
        }
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
    }

    searchItems() {
        const prev = this.mdbTable.getDataSource();
        if (!this.searchText) {
            this.mdbTable.setDataSource(this.previous);
            this.elements = this.mdbTable.getDataSource();
        }
        if (this.searchText) {
            this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
            this.mdbTable.setDataSource(prev);
        }
    }
}
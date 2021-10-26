import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { copyRow, remove, update } from '../grid.actions';
import { NodeWithI18n } from '@angular/compiler';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  rowData$: Observable<{}[]>;
  columnDefs$: Observable<ColDef[]>;

  constructor(private store: Store<{ myStore: any }>) {
    this.rowData$ = store.select((state) => {
      let rowData = state.myStore.rowData;
      return rowData;
    });
    this.columnDefs$ = store.select((state) => {
      let columnDefs = state.myStore.columnDefs;
      return columnDefs;
    });
  }

  private gridApi: any;
  private gridColumnApi: any;
  getRowNodeId(data: any) {
    return data.id;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  defaultColDef = {
    flex: 1,
    editable: true,
    valueSetter: ({ colDef, data, newValue }: any) => {
      let updatedRow = { ...data };
      updatedRow[colDef.field] = newValue;
      this.store.dispatch(update({ updatedRow }));
      return false;
    },
  };
  newIds = 3;

  getContextMenuItems = (params: any) => {
    // helpers for context menu
    let data = params.node.data;
    let rowId: number = this.getRowNodeId(data);

    // context menu options
    var result = [
      {
        name: '<b>Copy</b> ' + data.model,
        action: () => {
          this.newIds++;
          this.store.dispatch(
            copyRow({ rowToCopyId: rowId, newId: this.newIds })
          );
        },
      },
      {
        name: '<b>Delete</b> ' + data.model,
        action: () => {
          this.store.dispatch(remove({ id: rowId }));
        },
      },
    ];
    return result;
  };

  ngOnInit(): void {}
}

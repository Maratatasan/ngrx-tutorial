import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
import { copyRow, remove, update } from './grid.actions';

export const initialState = {
  count: 0,
  rowData: [
    { id: 0, make: 'Toyota', model: 'Celica', price: 35000 },
    { id: 1, make: 'Ford', model: 'Mondeo', price: 32000 },
    { id: 2, make: 'Porsche', model: 'Boxter', price: 72000 },
  ],
  columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
};

const _reducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, count: state.count + 1 })),
  on(decrement, (state) => ({ ...state, count: state.count - 1 })),
  on(reset, (state) => ({ ...state, count: 0 })),
  on(copyRow, (state, { rowToCopyId, newId }) => {
    const rowToCopy = state.rowData.find((it) => it.id === rowToCopyId);
    if (rowToCopy == null) throw new Error('unexpected');
    return {
      ...state,
      rowData: [
        ...state.rowData,
        {
          ...rowToCopy,
          id: newId,
        },
      ],
    };
  }),

  on(update, (state, { updatedRow }) => {
    let { rowData } = state;
    let newRowData = rowData.map((row) => {
      if (row.id === updatedRow.id) {
        return updatedRow;
      }
      return row;
    });
    return { ...state, rowData: newRowData };
  }),
  on(remove, (state, { id }) => {
    let { rowData } = state;
    const newRowData = rowData.filter((row) => row.id != id);
    return { ...state, rowData: [...newRowData] };
  })
);

export function reducer(state: any, action: any) {
  return _reducer(state, action);
}

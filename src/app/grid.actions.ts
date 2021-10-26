import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[Grid Component] Update',
  props<{ updatedRow: any }>()
);
export const copyRow = createAction(
  '[Grid Component] CopyRow',
  props<{ rowToCopyId: number; newId: number }>()
);
export const remove = createAction(
  '[Grid Component] Remove',
  props<{ id: number }>()
);

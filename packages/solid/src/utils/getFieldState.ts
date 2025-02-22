import { untrack } from 'solid-js';
import { FieldPath, FieldStore, FieldValues, RawFieldState } from '../types';

/**
 * Returns the state of the field.
 *
 * @param field The name of the field to get the state from.
 *
 * @returns The state of the field.
 */
export function getFieldState<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>(field: FieldStore<TFieldValues, TFieldName>): RawFieldState {
  return untrack(() => ({
    elements: field.getElements(),
    initialInput: field.getInitialInput(),
    input: field.getInput(),
    error: field.getError(),
    touched: field.getTouched(),
    dirty: field.getDirty(),
  })) as RawFieldState;
}

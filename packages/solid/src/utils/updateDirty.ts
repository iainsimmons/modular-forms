import { untrack } from 'solid-js';
import { FieldValues, FormState } from '../types';

/**
 * Updates the dirty state of the form.
 *
 * @param form The form for which the dirty state is to be updated.
 * @param dirty Whether dirty state is true.
 */
export function updateDirty<TFieldValues extends FieldValues>(
  form: FormState<TFieldValues>,
  dirty?: boolean
): void {
  // Ignores tracking of reactive dependencies
  untrack(() => {
    // Update dirty state of form
    form.internal.setDirty(
      dirty ||
        [...form.internal.fields, ...form.internal.fieldArrays].some(
          ([_, field]) => field.getActive() && field.getDirty()
        )
    );
  });
}

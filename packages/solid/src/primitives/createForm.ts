import { createSignal } from 'solid-js';
import {
  DeepPartial,
  FieldArrayStore,
  FieldStore,
  FieldValues,
  FormState,
  Response,
  ValidationMode,
} from '../types';

type FormOptions<TFieldValues extends FieldValues> = Partial<{
  initialValues: DeepPartial<TFieldValues>;
  validateOn: ValidationMode;
  revalidateOn: ValidationMode;
}>;

/**
 * Creates the core of a modular form that contains its reactive state.
 *
 * @param options The form options.
 *
 * @returns The state of the form.
 */
export function createForm<TFieldValues extends FieldValues>(
  options: FormOptions<TFieldValues> = {}
): FormState<TFieldValues> {
  // Destructure options and set default values
  const {
    initialValues = {},
    validateOn = 'submit',
    revalidateOn = 'input',
  } = options;

  // Create map of fields and field arrays
  const fields = new Map<string, FieldStore<TFieldValues>>();
  const fieldArrays = new Map<string, FieldArrayStore>();

  // Create field names and element signal
  const [getFieldNames, setFieldNames] = createSignal<string[]>([]);
  const [getElement, setElement] = createSignal<HTMLFormElement>();

  // Create submit count, submitting, submited and validating signal
  const [getSubmitCount, setSubmitCount] = createSignal(0);
  const [getSubmitting, setSubmitting] = createSignal(false);
  const [getSubmitted, setSubmitted] = createSignal(false);
  const [getValidating, setValidating] = createSignal(false);

  // Create touched, dirty and invalid signal
  const [getTouched, setTouched] = createSignal(false);
  const [getDirty, setDirty] = createSignal(false);
  const [getInvalid, setInvalid] = createSignal(false);

  // Create response signal
  const [getResponse, setResponse] = createSignal<Response>({});

  // Return form functions and state
  return {
    internal: {
      validators: new Set(),
      initialValues,
      validateOn,
      revalidateOn,
      fields,
      fieldArrays,
      getFieldNames,
      setFieldNames,
      setElement,
      setSubmitCount,
      setSubmitting,
      setSubmitted,
      setValidating,
      setTouched,
      setDirty,
      setInvalid,
      setResponse,
    },
    get element() {
      return getElement();
    },
    get submitCount() {
      return getSubmitCount();
    },
    get submitting() {
      return getSubmitting();
    },
    get submitted() {
      return getSubmitted();
    },
    get validating() {
      return getValidating();
    },
    get touched() {
      return getTouched();
    },
    get dirty() {
      return getDirty();
    },
    get invalid() {
      return getInvalid();
    },
    get response() {
      return getResponse();
    },
  };
}

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { CreateNoteParams, NoteTag } from "../../types/note";

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: CreateNoteParams) => void;
  isSubmitting?: boolean;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
  content: Yup.string().max(500, "Maximum 500 characters"),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required("Required"),
});

const initialValues: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Todo",
};

function NoteForm({ onCancel, onSubmit, isSubmitting = false }: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className={css.form}>
        {/* TITLE */}
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" name="title" type="text" className={css.input} />

          <ErrorMessage name="title">
            {(msg) => (
              <span data-name="title" className={css.error}>
                {msg}
              </span>
            )}
          </ErrorMessage>
        </div>

        {/* CONTENT */}
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage name="content">
            {(msg) => (
              <span data-name="content" className={css.error}>
                {msg}
              </span>
            )}
          </ErrorMessage>
        </div>

        {/* TAG */}
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={css.select}>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>

          <ErrorMessage name="tag">
            {(msg) => (
              <span data-name="tag" className={css.error}>
                {msg}
              </span>
            )}
          </ErrorMessage>
        </div>

        {/* ACTIONS */}
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;

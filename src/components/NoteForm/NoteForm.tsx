import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { NoteTag, CreateNoteParams } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: CreateNoteParams) => void;
  isSubmitting?: boolean;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object({
  title: Yup.string()
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters")
    .required("Required"),
  content: Yup.string().max(500, "Max 500 characters"),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS, "Invalid tag").required("Required"),
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
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

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

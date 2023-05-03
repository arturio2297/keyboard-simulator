import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../../utils/styles.utils";
import Button from "../../../../ui/button/Button";
import useStores from "../../../../hooks/useStores";
import Select, {SelectItem} from "../../../../ui/select/Select";
import Checkbox from "../../../../ui/checkbox/Checkbox";
import useClose from "../../../../hooks/useClose";
import Text from "../../../../ui/text/Text";
import {useFormik} from "formik";
import settingsStorage from "../../../../storage/SettingsStorage";
import useDialog from "../../../../hooks/useDialog";
import LoginDialog from "./LoginDialog";

const paragraphsCountSelectItems: SelectItem[] = Array.from({length: 10}).map((_, i) => {
  const value = i + 1;
  return {
    title: value + '',
    value
  }
});

interface FormValues {
  paragraphsCount: number;
  showHints: boolean;
}

const initialValues: FormValues = {
  paragraphsCount: 5,
  showHints: true
}

function StartSection(): JSX.Element {

  const {
    show: showLoginDialog,
    open: openLoginDialog,
    close: closeLoginDialog
  } = useDialog();
  const [closed, close] = useClose();
  const {workoutStore, accountStore} = useStores();
  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: () => {
      const {showLoginDialogBeforeWorkout} = settingsStorage.getForce();
      const openDialog = showLoginDialogBeforeWorkout && !accountStore.account;
      openDialog ? openLoginDialog() : start();
    }
  });

  const start = () => {
    closeLoginDialog();
    close(() => workoutStore.ready(formik.values.paragraphsCount, formik.values.showHints));
  }

  return (
    <section className={cs(styles['start-section'])}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <Text>
          Press <b>"Start"</b> to start your workout
        </Text>
        <Text>
          Before start you can select the number of paragraphs and enable/disable virtual keyboard hints
        </Text>
        <form
          className={styles['form']}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Select
            name="paragraphsCount"
            formik={formik}
            label="Number of paragraphs"
            items={paragraphsCountSelectItems}
          />
          <Checkbox
            name="showHints"
            formik={formik}
            label="Show keyboard hints"
          />
          <Button
            variant="success"
            type="submit"
          >
            Start
          </Button>
        </form>
      </div>
      {showLoginDialog &&
      <LoginDialog
          onCancel={closeLoginDialog}
          onContinueWithoutLogin={start}
      />}
    </section>
  );
}

export default observer(StartSection);
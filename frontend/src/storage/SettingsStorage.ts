import {ApplicationStorage} from "./ApplicationStorage";

interface Settings {
  showLoginDialogBeforeWorkout: boolean;
}

const settingsStorage = new ApplicationStorage<Settings>('settings', {
  showLoginDialogBeforeWorkout: true
});

export default settingsStorage;
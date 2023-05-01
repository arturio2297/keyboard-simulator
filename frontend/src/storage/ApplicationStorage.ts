export class ApplicationStorage<D extends {}> {

  constructor(private _key: string) {}

  public set(data: D) {
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  public get(): D | null {
    const dataString = localStorage.getItem(this._key);
    try {
      return JSON.parse(dataString as string);
    } catch (error) {
      return null;
    }
  }

  public clear() {
    localStorage.removeItem(this._key)
  }
}
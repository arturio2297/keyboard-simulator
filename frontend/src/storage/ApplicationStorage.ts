export class ApplicationStorage<D extends {}> {

  constructor(private _key: string, data?: D) {
    data && !this.get() && this.set(data);
  }

  public set(data: D) {
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  public setField(key: keyof D, value: any) {
    const data = this.get() || {} as D;
    this.set({...data, [key]: value});
  }

  public get(): D | null {
    const dataString = localStorage.getItem(this._key);
    try {
      return JSON.parse(dataString as string);
    } catch (error) {
      return null;
    }
  }

  public getForce(): D {
    return this.get() as D;
  }

  public clear() {
    localStorage.removeItem(this._key)
  }

}
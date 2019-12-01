class Auth {
  constructor() {
    this.authenticated = localStorage.getItem("token") === null ? false : true;
  }
  isAuthenticated() {
    return this.authenticated;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }
}

export default new Auth();

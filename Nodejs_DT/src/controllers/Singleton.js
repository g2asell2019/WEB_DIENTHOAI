const Singleton = (() => {
  let instance;

  // Private constructor
  const SingletonClass = function () {
    // Your constructor logic here
    if (process.env.NODE_ENV === "development") {
      console.log("Creating instance in development mode...");
    }
  };

  // Static method to access the singleton instance
  SingletonClass.getInstance = function () {
    if (!instance) {
      instance = new SingletonClass();
    }
    return instance;
  };

  return SingletonClass;
})();
export default Singleton;
module.exports = {

  info: (module, content) => {
    var date = new Date();

    console.log(`[${date} - ${module}]\t${content}`);
  },

  err: (module, content) => {
    var date = new Date();

    console.error(`[${date} - ${module}]\t${content}`);
  }

}
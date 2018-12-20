function initCommon() {
  return common = (function () {

    const expectJsonCall = async (url, settings, beforeSuccess, onSuccess, onFailure) => {
      try {
        const data = await fetch(url, settings);

        let statusCode = data.status;
        if(statusCode == 200) {
          if(beforeSuccess) {
            beforeSuccess(data);
          }
          let json = await data.json();
          onSuccess(json);
        } else {
          onFailure(statusCode);
        }
      }
      catch (e) {
        console.log("error:", e);
        onFailure(-999);
      }
    }

    const expectEmptyResponseCall = async (url, settings, beforeSuccess, onSuccess, onFailure) => {

    try {
      const data = await fetch(url, settings);
      let statusCode = data.status
      if(statusCode == 200) {
        if(beforeSuccess) {
          beforeSuccess();
        }
        onSuccess();
      } else {
        onFailure(statusCode);
      }
    }
    catch (e) {
      console.log("error:", e);
      onFailure(-999);
    }
  }

  return {
    expectJsonCall,
    expectEmptyResponseCall
  };

  }());
}

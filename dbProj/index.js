function callDotNetMethod() {
    const { getAssemblyExports } = globalThis.getDotnetRuntime(0);
    const exports = getAssemblyExports("dbProj.dll"); // Use the assembly name
  
    const message = exports.dotnetapp.Application.updateCarts(5, 3, 6, 9, 1);
    console.log(message); // Outputs: Hello from .NET!
  }

  callDotNetMethod();

//DotNet.invokeMethodAsync('updateCarts', 5, 3, 6, 9, 1);
//pressedOnce = true;

//var buttons = document.getElementById("container");
//buttons.onclick = onbuttonclicked;
//pressedOnce = false;

//function onbuttonclicked() {
//    if (!pressedOnce) {

//    }
//}
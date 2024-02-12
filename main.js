
import gameInterface from "./modules/GameInterface.js";
/*
    TODO-lista: 
    * Bättre feedback / visuell presentation av vad som händer i spelet. (GameInterface.js: rad 112)
    * Ordentlig Game Over-skärm och presentation av att en match är över. (GameInterface.js: rad 139)
    * Bättre tooltips för skill-beskrivningar istf. title-attribut som nu. (Game.js: rad 149)
    * Visad textbeskrivning av vald klass i character creatorn?
    * Utseende / design.
*/

// Start a new game 
try {
    gameInterface.newGame();
}
catch (error) {
    console.error(error);
    gameInterface.showError(error);
}

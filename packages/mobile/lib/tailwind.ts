// use twrnc's create so tailwind.config.js can be picked up
import { create } from "twrnc";

// create the customized version...
const tw = create(require(`../tailwind.config.js`));

export default tw;

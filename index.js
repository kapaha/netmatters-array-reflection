import Account from "./modules/account.js";
import Navigation from "./modules/navigation.js";
import ImageGenerator from "./modules/imageGenerator.js";
import Storage from "./modules/storage.js";

Account.init(Storage);
Navigation.init();
ImageGenerator.init(Account);

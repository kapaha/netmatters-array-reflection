import Account from "./modules/account.js";
import Navigation from "./modules/navigation.js";
import ImageGenerator from "./modules/imageGenerator.js";
import Storage from "./modules/storage.js";
import Gallery from "./modules/gallery.js";

Navigation.init();
ImageGenerator.init(Account);
Gallery.init(Account, Navigation);
Account.init(Storage);

class NavBarController {

  constructor() {
    // get the pathname
    let path = location.pathname.length > 1 ? location.pathname.substring(1, location.pathname.length) : 'home';

    // set nav logo
    this.logo = '';
    this.phrase = 'The Challenge';

    // define nav links
    this.links = ['Home','Rules','Example'];

    // reformat links into anchor tag objects
    this.links = this.links.map((link) => {
      let linkLowerCase = link.toLowerCase();
      let linkObj = {};

      linkObj.href = linkLowerCase;
      linkObj.label = link;

      if(linkLowerCase === path) linkObj.isActive = true;
      else linkObj.isActive = false;

      return linkObj;
    });
  }

  onLinkClicked(clickLinked) {
    this.links = this.links.map((link) => {
      link.isActive = link.label === clickLinked.label;
      return link;
    });
  }
}

const Navbar = {
  template: require('./navbar.html'),
  controller: () => new NavBarController()
};

export default Navbar;

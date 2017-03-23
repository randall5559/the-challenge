import NavBar from './navbar';

describe('Navbar Component Tests', () => {

  let controller;

  beforeEach(() => {
    controller = NavBar.controller();
  });

  it('should setup defaults', () => {
    expect(controller.logo).toEqual('');
    expect(controller.phrase).toEqual('The Challenge');

    expect(controller.links[0].href).toEqual('home');
    expect(controller.links[1].href).toEqual('rules');
    expect(controller.links[2].href).toEqual('example');
  });

  it('should link from links object - onLinkClicked()', () => {
    controller.onLinkClicked(controller.links[0]);

    expect(controller.links[0].isActive).toEqual(true);
  });
});

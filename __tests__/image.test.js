import React from 'react';
import { shallow, mount } from 'enzyme';
import { Image, Placeholder, Transformation } from 'cloudinary-react';

const RESPONSIVE_OVERRIDE_WARNING = [
  "Warning: passing a number value for width cancels the 'responsive' prop's effect on the image transformation.",
  "The 'responsive' prop affects the image transformation only when width === 'auto'.",
  "Passing 'width=\"auto\" responsive' will affect the actual image width that is fetched from Cloudinary.",
  "The 'responsive' prop causes the Image component to request an image which width is equal to the width of it's container.",
  "When passing 'width=\"auto\" responsive', you can set the <img> element width by passing a 'style' prop"
].join('\n');

describe('Image', () => {
  it('should create an img tag', function () {
    const tag = shallow(<Image publicId='sample' cloudName='demo' />);
    expect(tag.html()).toEqual(
      '<img src="http://res.cloudinary.com/demo/image/upload/sample"/>'
    );
  });
  it('should allow transformation params as attributes', function () {
    const tag = shallow(
      <Image publicId='sample' cloudName='demo' width={300} crop='scale' />
    );
    expect(tag.html()).toEqual(
      '<img width="300" src="http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"/>'
    );
  });
  it('should set event handlers', function () {
    const tag = shallow(
      <Image
        publicId='sample'
        cloudName='demo'
        width={300}
        crop='scale'
        onLoad={() => 'foo'}
      />
    );
    expect(tag.html()).toEqual(
      '<img width="300" src="http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample"/>'
    );
    expect(tag.props().onLoad()).toEqual('foo');
  });
  it('should not pass-through Cloudinary attributes', function () {
    let tag = shallow(
      <Image
        publicId='sample'
        cloudName='demo'
        width='auto'
        crop='scale'
        privateCdn='private'
        defaultImage='foobar'
        responsive
        responsiveUseBreakpoints
      />
    );

    expect(tag.type()).toEqual('img');
    expect(tag.props()).toHaveProperty('data-src');

    // We are checking for both snake_case and camelCase keys
    expect(tag.props()).not.toHaveProperty('privateCdn');
    expect(tag.props()).not.toHaveProperty('private_cdn');
    expect(tag.props()).not.toHaveProperty('defaultImage');
    expect(tag.props()).not.toHaveProperty('default_image');
    expect(tag.props()).not.toHaveProperty('responsiveUseBreakpoints');
    expect(tag.props()).not.toHaveProperty('responsive_use_breakpoints');
    tag = shallow(
      <Image
        publicId='sample'
        cloudName='demo'
        width={300}
        crop='scale'
        private_cdn='private'
        default_image='foobar'
      />
    );
    expect(tag.type()).toEqual('img');
    expect(tag.prop('src')).toEqual(
      'http://demo-res.cloudinary.com/image/upload/c_scale,d_foobar,w_300/sample'
    );
    expect(tag.props()).toHaveProperty('src');
    expect(tag.props()).not.toHaveProperty('privateCdn');
    expect(tag.props()).not.toHaveProperty('private_cdn');
    expect(tag.props()).not.toHaveProperty('defaultImage');
    expect(tag.props()).not.toHaveProperty('default_image');
  });
  it('should not fail to update cyclic property on an image element with transformation', function () {
    // makes sure Issue #31 - Error: Maximum call call stack size exceeded does not reoccur
    const obj1 = {};
    const obj2 = {};
    obj1.me = obj1;
    obj2.me = obj2;

    const tag = shallow(
      <Image publicId='sample' cloudName='demo'>
        <Transformation effect='art:hokusai' />
      </Image>
    );
    tag.setProps({ cyclicProp: obj1 });
    tag.setProps({ cyclicProp: obj2 });

    tag.setState({ cyclicProp: obj1 });
    tag.setState({ cyclicProp: obj2 });
  });
  it('should render a src property with an undefined value if a src is not defined', function () {
    const tag = mount(<Image cloudName='demo' />);
    expect(tag.find('img').prop('src')).toEqual(undefined);
  });
  it('should support custom function remote', () => {
    const customFunction = {
      function_type: 'remote',
      source:
        'https://df34ra4a.execute-api.us-west-2.amazonaws.com/default/cloudinaryFunction'
    };

    const tag = mount(
      <Image publicId='sample' cloudName='demo'>
        <Transformation customFunction={customFunction} />
      </Image>
    );

    expect(tag.find('img').prop('src')).toMatch(
      /fn_remote:aHR0cHM6Ly9kZjM0cmE0YS5leGVjdXRlLWFwaS51cy13ZXN0LTIuYW1hem9uYXdzLmNvbS9kZWZhdWx0L2Nsb3VkaW5hcnlGdW5jdGlvbg==\/sample/
    );
  });
  it('should support custom function wasm', () => {
    const customFunction = {
      function_type: 'wasm',
      source: 'blur.wasm'
    };

    const tag = mount(
      <Image publicId='sample' cloudName='demo'>
        <Transformation customFunction={customFunction} />
      </Image>
    );

    expect(tag.find('img').prop('src')).toMatch(/fn_wasm:blur.wasm\/sample/);
  });
  describe('prop names', () => {
    const tag = mount(
      <Image
        publicId='sample'
        cloudName='demo'
        data-testid='testing'
        aria-describedby='testValue'
      />
    );
    it('should not change kebab-case prop names', () => {
      expect(tag.find('img').prop('data-testid')).toEqual('testing');
      expect(tag.find('img').prop('aria-describedby')).toEqual('testValue');
    });
    it('should not duplicate attributes for kebab-case props', () => {
      expect(tag.find('img').prop('datatestid')).not.toBeDefined();
      expect(tag.find('img').prop('ariadescribedby')).not.toBeDefined();
      expect(tag.html()).toEqual(
        '<img src="http://res.cloudinary.com/demo/image/upload/sample" data-testid="testing" aria-describedby="testValue">'
      );
    });
  });
  it('should update on prop change', () => {
    const tag = mount(<Image publicId='sample' cloudName='demo' />);
    expect(tag.find('img').prop('src')).toEqual(
      'http://res.cloudinary.com/demo/image/upload/sample'
    );
    tag.setProps({ effect: 'sepia:20' });
    expect(tag.find('img').prop('src')).toEqual(
      'http://res.cloudinary.com/demo/image/upload/e_sepia:20/sample'
    );
    tag.setProps({ effect: 'sepia:30', secure: true });
    expect(tag.find('img').prop('src')).toEqual(
      'https://res.cloudinary.com/demo/image/upload/e_sepia:30/sample'
    );
  });
  it('Should support forwarding innerRef to underlying image element', function () {
    const expected = 'http://res.cloudinary.com/demo/image/upload/sample';
    const myRef = React.createRef();

    const tag = mount(
      <Image innerRef={myRef} cloudName='demo' publicId='sample' />
    );

    const image = myRef.current;

    expect(tag.find('img').prop('src')).toEqual(expected);
    expect(image.src).toEqual(expected);
  });
  it('Should support signature param', function () {
    const expected =
      'http://res.cloudinary.com/demo/image/upload/s--signature--/sample';

    const tag = mount(
      <Image cloudName='demo' publicId='sample' signature='signature' />
    );

    expect(tag.find('img').prop('src')).toEqual(expected);
  });
  describe('Responsive', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    it('should support responsive prop', () => {
      const tag = mount(<Image publicId='sample' cloudName='demo' />);
      tag.setProps({ responsive: true });
      expect(tag.find('img').prop('data-src')).toEqual(
        'http://res.cloudinary.com/demo/image/upload/sample'
      );

      expect(spy).toHaveBeenCalledWith(RESPONSIVE_OVERRIDE_WARNING);
      spy.mockRestore();
    });
    it('should set image width even when responsive prop is passed', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();

      const tag = mount(
        <Image publicId='sample' cloudName='demo' width={100} responsive />
      );
      expect(tag.find('img').prop('width')).toEqual(100);
      expect(spy).toHaveBeenCalledWith(RESPONSIVE_OVERRIDE_WARNING);
      spy.mockRestore();
    });
  });
  describe('Placeholder', () => {
    it('should not have opacity and position when placeholder doesn\'t exists', () => {
      const tag = shallow(<Image publicId='sample' cloudName='demo' />);
      expect(tag.find('img').first().props().style).toEqual(undefined);
    });
    it('should have opacity and position when placeholder exists', () => {
      const tag = shallow(
        <Image publicId='sample' cloudName='demo'>
          <Placeholder />
        </Image>
      );
      expect(tag.html()).toEqual(
        [
          '<img src="http://res.cloudinary.com/demo/image/upload/sample" style="opacity:0;position:absolute"/>',
          '<div style="display:inline">',
          '<img src="http://res.cloudinary.com/demo/image/upload/e_blur:2000,f_auto,q_1/sample"/>',
          '</div>'
        ].join('')
      );
    });
    describe('Placeholder With Lazy Loading', () => {
      const tag = shallow(
        <Image publicId='sample' cloudName='demo' loading='lazy'>
          <Placeholder />
        </Image>
      );

      it('should have data-src for placeholder and image', function () {
        expect(tag.html()).toEqual(
          [
            '<img loading="lazy" data-src="http://res.cloudinary.com/demo/image/upload/sample" style="opacity:0;position:absolute"/>',
            '<div style="display:inline">',
            '<img loading="lazy" data-src="http://res.cloudinary.com/demo/image/upload/e_blur:2000,f_auto,q_1/sample"/>',
            '</div>'
          ].join('')
        );
      });

      it('should have src for placeholder and image when in view', function () {
        tag.instance().componentDidMount();
        expect(tag.state().isInView).toEqual(undefined);

        // Mock an intersection call, as if the component is now in view
        /* eslint-disable no-undef */
        simulateIntersection([
          {
            target: tag.element,
            isIntersecting: true
          }
        ]);
        /* eslint-enable no-undef */

        expect(tag.state().isInView).toEqual(true);
        expect(tag.html()).toEqual(
          [
            '<img src="http://res.cloudinary.com/demo/image/upload/sample" style="opacity:0;position:absolute"/>',
            '<div style="display:inline">',
            '<img src="http://res.cloudinary.com/demo/image/upload/e_blur:2000,f_auto,q_1/sample"/>',
            '</div>'
          ].join('')
        );
      });
    });
    describe('Responsive Placeholder', () => {
      const tag = shallow(
        <Image
          publicId='sample'
          cloudName='demo'
          width='auto'
          crop='scale'
          responsive
        >
          <Placeholder />
        </Image>
      );
      it('should have data-src for placeholder and image', function () {
        expect(tag.html()).toEqual(
          [
            '<img data-src="http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample" style="opacity:0;position:absolute"/>',
            '<div style="display:inline">',
            '<img data-src="http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/e_blur:2000,f_auto,q_1/sample"/>',
            '</div>'
          ].join('')
        );
      });
    });
    describe('Responsive Placeholder With Lazy Loading', () => {
      const tag = shallow(
        <Image
          publicId='sample'
          cloudName='demo'
          loading='lazy'
          width='auto'
          crop='scale'
          responsive
        >
          <Placeholder />
        </Image>
      );
      it('should have data-src for placeholder and image', function () {
        expect(tag.html()).toEqual(
          [
            '<img loading="lazy" data-src="http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample" style="opacity:0;position:absolute"/>',
            '<div style="display:inline">',
            '<img loading="lazy" data-src="http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/e_blur:2000,f_auto,q_1/sample"/>',
            '</div>'
          ].join('')
        );
      });
    });
  });
  describe('Lazy Loading', () => {
    it('Should render src attribute when loading="eager" before image is in view', function () {
      const tag = shallow(
        <Image publicId='sample' cloudName='demo' loading='eager' />
      );
      expect(tag.type()).toEqual('img');
      expect(tag.prop('data-src')).toEqual(undefined);
      expect(tag.prop('src')).toEqual(
        'http://res.cloudinary.com/demo/image/upload/sample'
      );
    })
    ;['lazy', 'auto'].forEach((mode) => {
      it(`Should render data-src attribute when loading="${mode}" before image is in view`, function () {
        const tag = shallow(
          <Image publicId='sample' cloudName='demo' loading={mode} />
        );
        expect(tag.type()).toEqual('img');
        expect(tag.prop('data-src')).toEqual(
          'http://res.cloudinary.com/demo/image/upload/sample'
        );
        expect(tag.prop('src')).toEqual(undefined);
      });
      it(`Should render src attribute when loading="${mode}" after image is in view`, function () {
        const tag = shallow(
          <Image publicId='sample' cloudName='demo' loading={mode} />
        );

        // Mock an intersection call, as if the component is now in view
        /* eslint-disable no-undef */
        simulateIntersection([
          {
            target: tag.element,
            isIntersecting: true
          }
        ]);
        /* eslint-enable no-undef */

        expect(tag.prop('data-src')).toEqual(undefined);
        expect(tag.prop('src')).toEqual(
          'http://res.cloudinary.com/demo/image/upload/sample'
        );
      });
    });
  });
  describe('Accessibility', () => {
    it('Should render accessibility url', function () {
      // By disabling lifecycle methods, we make sure detectIntersection() is not called yet.
      const tag = shallow(
        <Image publicId='sample' cloudName='demo' accessibility='monochrome' />
      );

      expect(tag.html()).toEqual(
        '<img src="http://res.cloudinary.com/demo/image/upload/e_grayscale/sample"/>'
      );
    });
  });
  describe('Accessibility & Placeholder', () => {
    it('Should render accessible placeholder', function () {
      // By disabling lifecycle methods, we make sure detectIntersection() is not called yet.
      const tag = shallow(
        <Image publicId='sample' cloudName='demo' accessibility='monochrome'>
          <Placeholder type='blur' />
        </Image>
      );

      expect(tag.html()).toEqual(
        [
          '<img src="http://res.cloudinary.com/demo/image/upload/e_grayscale/sample" style="opacity:0;position:absolute"/>',
          '<div style="display:inline">',
          '<img src="http://res.cloudinary.com/demo/image/upload/e_grayscale/e_blur:2000,f_auto,q_1/sample"/>',
          '</div>'
        ].join('')
      );
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';

import { Image, CloudinaryContext } from 'cloudinary-react';

describe('CloudinaryContext', () => {
  it('should pass properties to children', function () {
    const tag = mount(
      <CloudinaryContext className='root' cloudName='demo'>
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith('<div')).toEqual(true);
    expect(tag.find('div').hasClass('root')).toEqual(true);
    expect(tag.children()).toHaveLength(1);
    const img = tag.find('div').childAt(0);
    expect(img.html()).toEqual(
      '<img src="http://res.cloudinary.com/demo/image/upload/sample">'
    );
  });

  it('should render without div', function () {
    const tag = mount(
      <CloudinaryContext className='root' cloudName='demo' includeOwnBody>
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith('<div')).toEqual(false);
  });
  it('should render with div', function () {
    const tag = mount(
      <CloudinaryContext
        className='root'
        cloudName='demo'
        includeOwnBody={false}
      >
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    expect(tag.html().startsWith('<div')).toEqual(true);
  });

  it('should pass properties to children with snake case', function () {
    const tag = mount(
      <CloudinaryContext className='root' cloudName='demo' fetch_format='auto'>
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    const img = tag.find('div').childAt(0);
    expect(img.html()).toEqual(
      '<img src="http://res.cloudinary.com/demo/image/upload/f_auto/sample">'
    );
  });

  it('should pass properties to children with kebab case', function () {
    const tag = mount(
      <CloudinaryContext className='root' cloudName='demo' fetch-format='auto'>
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    const img = tag.find('div').childAt(0);
    expect(img.html()).toEqual(
      '<img src="http://res.cloudinary.com/demo/image/upload/f_auto/sample">'
    );
  });

  it('should remove Cloudinary custom properties from CloudinaryContext component', function () {
    const html = mount(
      <CloudinaryContext
        className='root'
        cloudName='demo'
        quality='auto'
        secure='true'
        role='tab'
        aria-live='polite'
      >
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    const contextDiv = html.find('div');
    expect(contextDiv.find('.root').length).toEqual(1);
    expect(contextDiv.find("[role='tab']").length).toEqual(1);
    expect(contextDiv.find("[aria-live='polite']").length).toEqual(1);
    expect(contextDiv.find("[cloudName='demo']").length).toEqual(0);
    expect(contextDiv.find('[quality]').length).toEqual(0);

    // Verify that transformations from context are applied to components
    expect(contextDiv.find('img').prop('src')).toEqual(
      'https://res.cloudinary.com/demo/image/upload/q_auto/sample'
    );
  });

  it('should allow chained Contexts', function () {
    const tag = mount(
      <CloudinaryContext cloudName='demo'>
        <CloudinaryContext width='100' crop='scale'>
          <Image publicId='sample' />
        </CloudinaryContext>
      </CloudinaryContext>
    );
    expect(tag.find('img').prop('src')).toEqual(
      'http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample'
    );
  });

  it('should update url on context change', function () {
    const tag = mount(
      <CloudinaryContext cloudName='demo'>
        <Image publicId='sample' />
      </CloudinaryContext>
    );

    expect(tag.find('img').prop('src')).toEqual(
      'http://res.cloudinary.com/demo/image/upload/sample'
    );
    tag.setProps({ cloudName: 'demo2' }).update();
    expect(tag.find('img').prop('src')).toEqual(
      'http://res.cloudinary.com/demo2/image/upload/sample'
    );
  });
});

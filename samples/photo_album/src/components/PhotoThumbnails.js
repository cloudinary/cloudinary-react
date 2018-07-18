import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const transformations = [
    [{ crop: 'fill', width: '150', height: '150', radius: '10' }],
    [{ crop: 'scale', width: '150', height: '150' }],
    [{ crop: 'fit', width: '150', height: '150' }],
    [{ crop: 'thumb', gravity: 'face', width: '150', height: '150' }],
    [
        {
            crop: 'fill',
            effect: 'sepia',
            gravity: 'north',
            width: '150',
            height: '150',
            radius: '20',
        },
        { angle: '20' },
    ],
];

const PhotoThumbnails = ({ publicId }) => (
    <table className="thumbnails">
        <tr>
            {transformations.map(transformation => {
                return (
                    <td>
                        <div className="thumbnail_holder">
                            <Image
                                publicId={publicId}
                                className="thumbnail inline"
                                format="jpg"
                            >
                                {transformation.map(
                                    (subTransformation, index) => {
                                        return (
                                            <Transformation
                                                {...subTransformation}
                                                key={index}
                                            />
                                        );
                                    }
                                )}
                            </Image>
                        </div>
                        <table class="info">
                            {transformation.map(subTransformation => {
                                return Object.keys(subTransformation).map(
                                    prop => {
                                        return (
                                            <tr>
                                                <td>{prop}</td>
                                                <td>
                                                    {subTransformation[prop]}
                                                </td>
                                            </tr>
                                        );
                                    }
                                );
                            })}
                        </table>
                        <br />
                    </td>
                );
            })}
        </tr>
    </table>
);

export default PhotoThumbnails;

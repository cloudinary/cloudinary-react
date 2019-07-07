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

const PhotoThumbnails = ({publicId}) => (
    <table className="thumbnails">
        <tbody>
        <tr>
            {transformations.map((transformation, transformationIndex) => {
                return (
                    <td key={transformationIndex}>
                        <div className="thumbnail_holder">
                            <Image
                                publicId={publicId}
                                className="thumbnail inline"
                                format="jpg"
                            >
                                {transformation.map(
                                    (subTransformation, subTransformationIndex) => {
                                        return (
                                            <Transformation
                                                {...subTransformation}
                                                key={subTransformationIndex}
                                            />
                                        );
                                    }
                                )}
                            </Image>
                        </div>
                        <table className="info">
                            <tbody>
                            {transformation.map(subTransformation => {
                                return Object.keys(subTransformation).map(
                                    (prop, propIndex) => {
                                        return (
                                            <tr key={propIndex}>
                                                <td>{prop}</td>
                                                <td>
                                                    {subTransformation[prop]}
                                                </td>
                                            </tr>
                                        );
                                    }
                                );
                            })}
                            </tbody>
                        </table>
                        <br />
                    </td>
                );
            })}
        </tr>
        </tbody>
    </table>
);

export default PhotoThumbnails;

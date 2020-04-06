import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet"

export const VideoPlayerWidget = (props) => {
    useEffect(() => {
        /*global cloudinary*/
        (function () {
            const cld = cloudinary.Cloudinary.new({
                cloud_name: props.cloudName, secure: props.secure, private_cdn: props.privateCdn, secure_distribution: props.cdnHost
            });
            return cld.videoPlayer(props.playerId, props.playerProps);
        })();
    }, []);

    let classString = 'cld-video-player';
    if (props.useLightSkin) {
        classString += ' cld-video-player-skin-light';
    }
    return (
        <>
            {props.includeScripts && (
                <Helmet>
                    <link href="https://unpkg.com/cloudinary-video-player@1.2.1/dist/cld-video-player.min.css" rel="stylesheet" type="text/css" />
                    <script src="https://unpkg.com/cloudinary-core@2.6.3/cloudinary-core-shrinkwrap.min.js" type="text/javascript"></script>
                    <script src="https://unpkg.com/cloudinary-video-player@1.2.1/dist/cld-video-player.min.js" type="text/javascript"></script>
                </Helmet>
            )}

            <video
                id={props.playerId}
                data-cld-public-id={props.publicId}
                className={classString}>
            </video>
        </>
    );
};

VideoPlayerWidget.propTypes = {
    publicId: PropTypes.string.isRequired,
    playerId: PropTypes.string.isRequired,
    cloudName: PropTypes.string.isRequired,
    privateCdn: PropTypes.bool,
    secure: PropTypes.bool,
    cdnHost: PropTypes.string,
    useLightSkin: PropTypes.bool,
    includeScripts: PropTypes.bool,
    playerProps: PropTypes.object // https://cloudinary.com/documentation/video_player_api_reference#constructor_parameters
};

VideoPlayerWidget.defaultProps = {
    secure: true,
    includeScripts: true,
    playerProps: {
        controls: true,
        autoplay: false,
        fluid: true
    }
};

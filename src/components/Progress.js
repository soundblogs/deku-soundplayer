/** @jsx dom */
import dom from 'magic-virtual-element'; // eslint-disable-line no-unused-vars
import SoundCloudAudio from 'soundcloud-audio';

export default {
    defaultProps: {
        value: 0
    },

    propTypes: {
        value: {
            type: 'number'
        },

        soundCloudAudio: function (prop) {
            return (prop instanceof SoundCloudAudio);
        }
    },

    render(component) {
        let { props } = component;
        let { value, soundCloudAudio } = props;

        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        let style = {width: `${value}%`};

        function handleSeekTrack (e) {
            const xPos = (e.pageX - e.delegateTarget.getBoundingClientRect().left) / e.delegateTarget.offsetWidth;

            if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
                soundCloudAudio.audio.currentTime = (xPos * soundCloudAudio.audio.duration);
            }
        }

        return (
            <div class="sb-soundplayer-progress-container" onClick={handleSeekTrack}>
                <div class="sb-soundplayer-progress-inner" style={style} />
            </div>
        );
    }
};

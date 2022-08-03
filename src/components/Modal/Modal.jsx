import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      console.log('CLOSED MODAL');
      this.props.closeModal();
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { images } = this.props;
    return (
      <div className={s.Overlay} onClick={this.handleBackdrop}>
        <div className={s.Modal}>
          <img src={images} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  images: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

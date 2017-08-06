import React from 'react';
import ErrorComponent from './ErrorComponent';


/**
 *
 * @param Component
 * @param printConsole
 * @param CustomErrorComponent
 * @returns {ReactStable}
 */
export default function reactStableDecorator(Component, printConsole = true, CustomErrorComponent = ErrorComponent) {

  return class ReactStable extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
      super(props);
    }

    /**
     *
     */
    componentWillMount() {
      this.component = new Component(this.props);
      this.component.forceUpdate = this.forceUpdate.bind(this);
      this.component.setState = this.setState.bind(this);

      this._callWrapper('componentWillMount');
    }

    /**
     *
     */
    componentDidMount() {
      this._callWrapper('componentDidMount');
    }

    /**
     *
     */
    componentWillUnmount() {
      this._callWrapper('componentWillUnmount');
    }

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
      this._callWrapper('componentWillUnmount', [nextProps]);
    }

    /**
     *
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
      return this._hasMethod('shouldComponentUpdate') ? this._callWrapper('shouldComponentUpdate', [nextProps, nextState]) : true;
    }

    /**
     *
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps, nextState) {
      this._callWrapper('componentWillUnmount', [nextProps, nextState]);
    }

    /**
     *
     * @returns {*}
     */
    render() {
      return this._callWrapper('render')
    }

    /**
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
      this._callWrapper('componentDidUpdate', [prevProps, prevState])
    }

    /**
     *
     * @param methodName
     * @param args
     * @returns {*}
     * @private
     */
    _callWrapper(methodName, args) {
      try {
        return this._hasMethod(methodName) && this.component[methodName](args);
      }
      catch (error) {
        printConsole && console.error(error.message);
        return CustomErrorComponent ? <CustomErrorComponent error={error} /> : null;
      }
    }

    /**
     *
     * @param methodName
     * @returns {boolean}
     * @private
     */
    _hasMethod(methodName) {
      return typeof this.component[methodName] === 'function';
    }

  };

}
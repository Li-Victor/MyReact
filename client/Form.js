(() => {
  class Form extends MyReact.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.state.value = event.target.value;
    }

    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      const flavors = ['Grapefruit', 'Lime', 'Coconut', 'Mango'];

      const options = flavors.map(flavor =>
        MyReact.createElement('option', { value: flavor }, flavor)
      );

      return super.render(
        MyReact.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          MyReact.createElement(
            'label',
            null,
            'Pick your favorite La Croix flavor:',
            MyReact.createElement(
              'select',
              {
                value: this.state.value,
                onChange: this.handleChange
              },
              options
            )
          ),
          MyReact.createElement('input', { type: 'submit', value: 'Submit' })
        )
      );
    }
  }

  MyReact.render(Form, document.getElementById('root'));
})();

import React, { Component } from 'react';
import './CreateBuyer.css'


//App Component
class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: "",
      res_name: "",
      res_address: false,
      suite: "",
      phone: "",
      role: ""
    }

  }
  render() {
    return (
      <div className="create-buyer">
        <div>
          <h3><span className="font-weight-bold">Congrats on getting started with Grubhub!</span></h3>
          <h5><span className="font-weight-bold">In just four steps, you'll be on your way to growing your business.</span></h5>
          <p> Not quite ready? Reach out to learn more. </p>
        </div>  
        <div>
          <form>
            <field>
              <span>How many locations are you signing up?</span>
              <input></input>
            </field>
            <field>
              <h5>Restaurant information</h5>
            </field>
            <field>
              <span>Restaurant name</span><input></input>
            </field>
            <field>
              <span>Restaurant address </span><input></input>
            </field>
            <field>
              <span>Suite </span><input></input>
            </field>
            <field>
              <span>Restaurant phone number </span><input></input>
            </field>
            <field>
              <span></span> Role<input></input>
            </field>
            <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
            <div className="text-centre">
              <a href="/pricing">Save and Continue</a>
            </div>
          </form>

        </div>
      </div>
    );
  }
}
//Export the App component so that it can be used in index.js
export default AccountInfo;

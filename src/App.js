import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Modal, Button } from 'react-bootstrap'
import DatePick from './DatePick'
import '../src/App.css'

class App extends React.Component {
  state = {
    users: null,
    show: false,
    selectedUser: '',
    activities: []
  }


  async componentDidMount() {
    fetch("https://0d61e099-82e9-47f4-b7d8-29662e372306.mock.pstmn.io/v1/home")
      .then((resp) => {
        resp.json().then((result) => {
          console.log(result);
          this.setState({ users: result.members })
        })
      })


  }
  handleModal() {
    this.setState({ show: !this.state.show })
  }
  fetchUser(item) {

    this.setState({ selectedUser: item.real_name })
    this.setState({ activities: item.activity_periods })



  }
  render() {
    console.log(this.state.selectedUser);
    return (
      <div className="main_div center_div">
        <h1 className="header" >User List </h1>


        {
          this.state.users ?
            this.state.users.map((item, i) =>

              <div>
                <ul className="list-group d-flex w-100 justify-content-between">
                  <li className="list-group-item content">
                    {/* this.handleModal(); */}
                    <a onClick={() => { this.fetchUser(item); this.handleModal() }} className="list-group-item list-group-item-action">
                      {item.real_name}


                    </a>
                  </li>
                </ul>
                <div className="modal fade" id="createModal" data-backdrop="false">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <Modal show={this.state.show} className="modal-backdrop" >
                        <Modal.Header closeButton onClick={() => { this.handleModal() }}>
                          <Modal.Title >User Activities</Modal.Title>
                          <br />

                        </Modal.Header>
                        <Modal.Body>

                          <h2 className="header h2"><small>User Name:</small> {this.state.selectedUser}</h2>
                          <br />
                          <DatePick /> <br />
                          {/* <h2>{this.state.activities}</h2> */}
                          {
                            this.state.activities ?
                              this.state.activities.map((item, i) =>
                                <div>
                                  <ul className="list-group d-flex w-100 justify-content-between">
                                    <li className="list-group-item">
                                      {item.start_time} to  {item.end_time}
                                    </li>
                                  </ul>

                                </div>
                              )
                              :
                              null

                          }


                        </Modal.Body>
                        <Modal.Footer>

                          <Button variant="dark" onClick={() => { this.handleModal() }}>Go Back</Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>

            )
            :
            null
        }

      </div>





    )
  }
}

export default App;

import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <main>
        <div className="content">
          <div className="about">
            <h2>About</h2>

            <div className="entries">
              <div className="entry">
                <div className="user">
                  <img
                    src="https://via.placeholder.com/60"
                    alt=""
                    className="avatar"
                  />
                  <h3>User 1</h3>
                </div>
                <p>Entry 1</p>
              </div>
              <div className="entry">
                <div className="user">
                  <img
                    src="https://via.placeholder.com/60"
                    alt=""
                    className="avatar"
                  />
                  <h3>User 2</h3>
                </div>
                <p>Entry 2</p>
              </div>
              <div className="entry">
                <div className="user">
                  <img
                    src="https://via.placeholder.com/60"
                    alt=""
                    className="avatar"
                  />
                  <h3>User 3</h3>
                </div>
                <p>Entry 3</p>
              </div>
              <div className="entry">
                <div className="user">
                  <img
                    src="https://via.placeholder.com/60"
                    alt=""
                    className="avatar"
                  />
                  <h3>User 4</h3>
                </div>
                <p>Entry 4</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

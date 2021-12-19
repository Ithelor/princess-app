import React from 'react'

const Landing = () => {
  return (
    <main>
      <div className="content">
        <div className="landing">
          <div className="dashboard">
            <div className="user">
              <img
                src="https://via.placeholder.com/80"
                alt="user"
                className="avatar"
              />
              <h3>User</h3>
              <p>Additional</p>
            </div>
            <div className="links">
              <div className="link">
                <h3>Link1</h3>
              </div>
              <div className="link">
                <h3>Link2</h3>
              </div>
              <div className="link">
                <h3>Link3</h3>
              </div>
            </div>
          </div>
          <hr className="vertical" width="" size="450" />
          <div className="settings">
            <h3>Settings</h3>
            <div className="settings-items">
              <div className="settings-item">
                <h4>Setting 1</h4>
                <p>Description 1</p>
              </div>
              <div className="settings-item">
                <h4>Setting 2</h4>
                <p>Description 2</p>
              </div>
              <div className="settings-item">
                <h4>Setting 3</h4>
                <p>Description 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Landing

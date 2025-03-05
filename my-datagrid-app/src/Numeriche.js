// numeriche.js
import React from "react";
import {
  FaHdd,
  FaFileAlt,
  FaExclamationTriangle,
  FaPercent,
  FaTimesCircle,
  FaBan,
} from "react-icons/fa";
import "./style.css";

const Numeriche = () => {
  return (
    <div className="numeriche">
      <div className="container">
        <div className="frame">
          {/* GB Conservati */}
          <div className="formato-destinazione">
            <div className="left-content">
              <div className="info-label">
                <div className="label-container">
                  <div className="label">GB Conservati</div>
                </div>
                <FaHdd className="info-icon" />
              </div>
            </div>
            <div className="value-container">
              <div className="line" />
              <div className="value">23,3 GB</div>
            </div>
          </div>

          {/* N° Documenti */}
          <div className="formato-destinazione formato-destinazione-2">
            <div className="left-content">
              <div className="info-label">
                <div className="label-container">
                  <div className="label">N° Documenti</div>
                </div>
                <FaFileAlt className="info-icon" />
              </div>
            </div>
            <div className="value-container">
              <div className="line" />
              <div className="value">1.223.350</div>
            </div>
          </div>

          {/* N° Interruzioni */}
          <div className="formato-destinazione formato-destinazione-3">
            <div className="left-content">
              <div className="info-label">
                <div className="label-container">
                  <div className="label">N° Interruzioni</div>
                </div>
                <FaExclamationTriangle className="info-icon" />
              </div>
            </div>
            <div className="value-container">
              <div className="line" />
              <div className="value">38</div>
            </div>
          </div>
        </div>

        <div className="frame">
          {/* % Disponibilità */}
          <div className="formato-destinazione formato-destinazione-4">
            <div className="frame-2">
              <div className="left-content-2">
                <div className="info-label">
                  <div className="label-container">
                    <div className="label">% Disponibilità</div>
                  </div>
                  <FaPercent className="info-icon" />
                </div>
              </div>
              <div className="value-container-2">
                <div className="line" />
                <div className="text-wrapper">40%</div>
              </div>
            </div>
            <div className="data-plot-wrapper">
              <div className="data-plot">
                <div className="overlap-group">
                  <div className="circle ellipse" />
                  <div className="circle img" />
                  <div className="circle ellipse-2" />
                </div>
              </div>
            </div>
          </div>

          {/* % Versamenti KO */}
          <div className="formato-destinazione formato-destinazione-5">
            <div className="frame-3">
              <div className="info-label">
                <div className="label-container">
                  <div className="label">% Versamenti KO</div>
                </div>
                <FaTimesCircle className="info-icon" />
              </div>
              <div className="value-container-2">
                <div className="line" />
                <div className="text-wrapper">12%</div>
              </div>
            </div>
            <div className="data-plot-wrapper">
              <div className="data-plot">
                <div className="overlap-group">
                  <div className="circle ellipse-3" />
                  <div className="circle ellipse-4" />
                  <div className="circle ellipse-2" />
                </div>
              </div>
            </div>
          </div>

          {/* % Rifiuto PDD */}
          <div className="formato-destinazione formato-destinazione-6">
            <div className="frame-2">
              <div className="info-label">
                <div className="label-container">
                  <div className="label">% Rifiuto PDD</div>
                </div>
                <FaBan className="info-icon" />
              </div>
              <div className="value-container-2">
                <div className="line" />
                <div className="text-wrapper">2%</div>
              </div>
            </div>
            <div className="data-plot-wrapper">
              <div className="data-plot">
                <div className="overlap-group">
                  <div className="circle ellipse-5" />
                  <div className="circle ellipse-4" />
                  <div className="circle ellipse-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numeriche;
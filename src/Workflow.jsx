import React, { useState } from "react";
import { stepsData, flows } from "./stepsData";
import "./workflow.css";

export default function Workflow() {
  const [steps, setSteps] = useState(stepsData);
  const [currentStep, setCurrentStep] = useState(0);

  // Track P2P or Ethernet globally
  const [linkType, setLinkType] = useState("");

  /** STEP 1 — MAIN DESIGN CHOICE */
  const handleDesignChoice = (optionName) => {
    const selected = stepsData[0].options.find((o) => o.name === optionName);
    const newFlow = flows[selected.flow].map((s) => ({ ...s }));

    const updatedSteps = [
      {
        ...stepsData[0],
        selectedOption: optionName,
        status: "pending",
      },
      ...newFlow,
    ];

    setSteps(updatedSteps);
    setCurrentStep(0);
    setLinkType(""); // Reset link type when design changes
  };

  /** STEP 2 — Link selection */
  const handleLinkChoice = (stepId, optionName) => {
    const type = optionName.includes("Ether") ? "ether" : "p2p";
    setLinkType(type);

    const updatedSteps = steps.map((s) =>
      s.id === stepId ? { ...s, selectedOption: optionName } : s
    );

    setSteps(updatedSteps);
  };

  /** NEXT / PREVIOUS NAVIGATION */
  const nextStep = () => {
    const updated = steps.map((s, idx) =>
      idx === currentStep ? { ...s, status: "completed" } : s
    );
    setSteps(updated);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderMultilineText = (text) => {
    if (!text) return null;

    return text
      .trim()
      .split(/\n\s*\n|•/g) // split on blank line OR bullet
      .map(
        (para, i) =>
          para.trim() &&
          (para.includes("•") ? (
            <p key={i}>• {para.replace("•", "").trim()}</p>
          ) : (
            <p key={i}>{para.trim()}</p>
          ))
      );
  };

  const step = steps[currentStep];

  /** Utility: Show text ONLY if not empty and not "-" */
  const renderSafeText = (value) => {
    if (!value) return null;
    if (
      typeof value === "string" &&
      (value.trim() === "" || value.trim() === "-")
    )
      return null;
    return <p>{value}</p>;
  };

  return (
    <div className="workflow-container">
      {/* LEFT PANEL */}
      <div className="left-container">
        <div className="left-header">
          <h1>High Availability and Redundancy</h1>
          <p>Follow these steps to complete your software configuration</p>
        </div>

        <div className="left-panel">
          {steps.map((s, index) => {
            const isActive = index === currentStep;
            const isCompleted = s.status === "completed";

            return (
              <div
                key={s.id}
                className={`step-item ${isActive ? "active" : ""} ${
                  isCompleted ? "completed" : ""
                } disabled-step`}
              >
                <div className="step-icon">{isCompleted ? "✔" : index + 1}</div>

                <div className="step-text">
                  <h4>{s.title}</h4>

                  {/* Selected Option */}
                  {s.selectedOption && (
                    <small className="left-selected">
                      Selected: {s.selectedOption}
                    </small>
                  )}

                  {/* Pending Badge */}
                  {!isCompleted && (
                    <span className="status-badge">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="step-indicator">
          Step {currentStep + 1} of {steps.length}
        </div>

        <h2>{step.title}</h2>

        {renderSafeText(step.subtitle)}

        <div className="content-box">
          {/* DESIGN CHOICE STEP */}
          {step.type === "designChoice" && (
            <div>
              <div className="radio-group">
                <h3>
                  Select the configuration type that best fits your
                  requirements:
                </h3>

                {step.options.map((opt) => (
                  <label key={opt.name} className="radio-item">
                    <input
                      type="radio"
                      name="designChoice"
                      checked={step.selectedOption === opt.name}
                      onChange={() => handleDesignChoice(opt.name)}
                    />
                    <span className="radio-label-text">{opt.name}</span>
                  </label>
                ))}
              </div>

              {step.selectedOption && (
                <div className="selected-image-box">
                  <div className="desc2-text">
                    {renderMultilineText(
                      step.options.find((o) => o.name === step.selectedOption)
                        .fullDesc
                    )}
                  </div>
                  <img
                    src={
                      step.options.find((o) => o.name === step.selectedOption)
                        .image
                    }
                    alt=""
                    className="selected-image1"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          )}

          {/* LINK CHOICE STEP */}
          {step.type === "linkChoice" && (
            <div>
              <h3>Choose the link aggregation or protocol approach:</h3>

              <div className="radio-group">
                {step.options.map((opt) => (
                  <label key={opt.name} className="radio-item">
                    <input
                      type="radio"
                      name={`linkChoice-${step.id}`}
                      checked={step.selectedOption === opt.name}
                      onChange={() => handleLinkChoice(step.id, opt.name)}
                    />
                    <span className="radio-label-text">{opt.name}</span>
                  </label>
                ))}
              </div>

              {step.selectedOption && (
                <div className="selected-image-box">
                  <div className="desc2-text">
                    {renderMultilineText(
                      step.options.find((o) => o.name === step.selectedOption)
                        .fullDesc
                    )}
                  </div>
                  <img
                    src={
                      step.options.find((o) => o.name === step.selectedOption)
                        .image
                    }
                    alt=""
                    className="selected-image"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          )}

          {/* INFO STEP */}
          {step.type === "info" && (
            <div className="info-box">
              <h3>{step.title}</h3>

              {/* CASE 1: fullDesc is object -> p2p/ether */}
              {step.fullDesc &&
                linkType &&
                typeof step.fullDesc !== "string" &&
                step.fullDesc[linkType] &&
                renderMultilineText(step.fullDesc[linkType].text)}

              {/* CASE 1 IMAGE */}
              {step.fullDesc &&
                linkType &&
                typeof step.fullDesc !== "string" &&
                step.fullDesc[linkType]?.image && (
                  <img
                    src={step.fullDesc[linkType].image}
                    alt=""
                    className="selected-image"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

              {/* CASE 2: fullDesc is string -> redundant images & text */}
              {typeof step.fullDesc === "string" &&
                renderMultilineText(step.fullDesc)}

              {/* CASE 2 IMAGE */}
              {typeof step.fullDesc === "string" && step.image && (
                <img
                  src={step.image}
                  alt=""
                  className="selected-image"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="navigation-buttons">
          <button
            className="prev-btn"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          <button className="next-btn" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

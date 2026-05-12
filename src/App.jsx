import React, { useState } from "react";

const stages = [
  {
    key: "Q",
    title: "질문생성",
    subtitle: "궁금한 점을 질문으로 만들기",
    colorClass: "blue",
    textClass: "text-blue",
    bgClass: "bg-blue",
  },
  {
    key: "D",
    title: "질문심화",
    subtitle: "기초 질문을 더 깊게 다듬기",
    colorClass: "purple",
    textClass: "text-purple",
    bgClass: "bg-purple",
  },
  {
    key: "I",
    title: "탐구방법 선택",
    subtitle: "질문에 맞는 탐구방법 고르기",
    colorClass: "green",
    textClass: "text-green",
    bgClass: "bg-green",
  },
  {
    key: "V",
    title: "질문검증",
    subtitle: "탐구할 가치와 가능성 점검하기",
    colorClass: "orange",
    textClass: "text-orange",
    bgClass: "bg-orange",
  },
  {
    key: "E",
    title: "공유하기",
    subtitle: "질문과 탐구 과정을 나누기",
    colorClass: "teal",
    textClass: "text-teal",
    bgClass: "bg-teal",
  },
];

const deepeningStrategies = [
  {
    key: "WHY",
    title: "WHY",
    subtitle: "왜 ~일까?",
    guide: "까닭이나 원인을 생각하며 질문을 깊게 만들어 봅니다.",
  },
  {
    key: "IF",
    title: "IF",
    subtitle: "만약 ~라면?",
    guide: "상황을 바꾸어 상상하며 새로운 질문으로 확장해 봅니다.",
  },
  {
    key: "COMPARE",
    title: "비교",
    subtitle: "~와 ~중 무엇이 더?",
    guide: "두 대상이나 상황을 견주며 질문을 더 분명하게 만듭니다.",
  },
  {
    key: "PERSPECTIVE",
    title: "관점",
    subtitle: "다른 입장은?",
    guide: "다른 사람이나 대상의 입장에서 질문을 다시 바라봅니다.",
  },
  {
    key: "RESULT",
    title: "결과",
    subtitle: "어떤 결과가?",
    guide: "질문과 관련된 변화나 영향을 예상하며 질문을 발전시킵니다.",
  },
  {
    key: "VALUE",
    title: "가치",
    subtitle: "옳은 선택일까?",
    guide: "선택, 판단, 의미를 생각하며 질문의 가치를 높입니다.",
  },
];

const inquiryMethods = [
  "문헌 조사",
  "관찰",
  "실험",
  "설문 조사",
  "인터뷰",
  "자료 분석",
];

const initialData = {
  topic: "",
  basicQuestion: "",
  strategy: "",
  deepenedQuestion: "",
  method: "",
  methodReason: "",
  plan: "",
  verification: {
    curiosity: false,
    relevance: false,
    feasibility: false,
    expansion: false,
    sharing: false,
  },
  verificationNote: "",
  finalQuestion: "",
  shareTitle: "",
  shareContent: "",
};

function QBot({ children }) {
  return (
    <div className="qbot">
      <div className="qbot-face">Q</div>
      <div className="qbot-message">{children}</div>
    </div>
  );
}

function SectionHeader({ stage, step, title, description }) {
  return (
    <>
      <div className={`section-label ${stage.bgClass} ${stage.textClass}`}>
        <span>{stage.key}</span>
        <span>{stage.title}</span>
        <span>{step}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>
    </>
  );
}

function StartPage({ setCurrentStageKey }) {
  return (
    <div className="start-page">
      <div className="start-inner">
        <div className="badge">Q-DIVE 질문 기반 탐구 웹앱</div>
        <h1 className="start-title">Q-DIVE</h1>
        <p className="start-desc">
          질문으로 깊이 있는 탐구의 여정을 시작해요.
          <br />
          내가 만든 질문을 더 깊게 다듬고,
          <br />
          탐구방법을 선택한 뒤 친구들과 공유해 봅시다.
        </p>

        <div className="stage-grid">
          {stages.map((stage) => (
            <button
              key={stage.key}
              className="stage-card"
              onClick={() => setCurrentStageKey(stage.key)}
            >
              <div className={`stage-icon ${stage.colorClass}`}>
                {stage.key}
              </div>
              <div className={`stage-key ${stage.textClass}`}>
                {stage.key}
              </div>
              <div className="stage-title">{stage.title}</div>
              <div className="stage-subtitle">{stage.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ currentStageKey, setCurrentStageKey }) {
  return (
    <aside className="sidebar">
      <div className="logo-row">
        <div className="logo-mark">Q</div>
        <div>
          <div className="logo-title">Q-DIVE</div>
          <div className="logo-sub">질문으로 깊이 탐구하기</div>
        </div>
      </div>

      {stages.map((stage) => (
        <button
          key={stage.key}
          className={
            currentStageKey === stage.key ? "nav-button active" : "nav-button"
          }
          onClick={() => setCurrentStageKey(stage.key)}
        >
          {stage.key} · {stage.title}
        </button>
      ))}
    </aside>
  );
}

function Topbar({
  currentStage,
  setCurrentStageKey,
  saveData,
  resetData,
}) {
  return (
    <header className="topbar">
      <button className="topbar-title" onClick={() => setCurrentStageKey("MAIN")}>
        <div className={`topbar-key ${currentStage.colorClass}`}>
          {currentStage.key}
        </div>
        <div>
          <div className="topbar-name">Q-DIVE</div>
          <div className="topbar-sub">{currentStage.title}</div>
        </div>
      </button>

      <div className="topbar-actions">
        <button className="btn secondary" onClick={resetData}>
          초기화
        </button>
        <button className="btn" onClick={saveData}>
          저장
        </button>
      </div>
    </header>
  );
}

function QStage({ data, setData }) {
  const stage = stages[0];

  return (
    <>
      <SectionHeader
        stage={stage}
        step="1"
        title="질문을 만들어 보세요"
        description="탐구하고 싶은 주제를 정하고, 처음 질문을 작성합니다."
      />

      <div className="panel-grid">
        <section className="panel">
          <label className="field">
            <div className="field-title">탐구 주제</div>
            <input
              value={data.topic}
              onChange={(e) => setData({ ...data, topic: e.target.value })}
              placeholder="예: 인공지능, 환경, 우리 마을, 동물, 미래 직업"
            />
          </label>

          <label className="field">
            <div className="field-title">기초 질문</div>
            <textarea
              value={data.basicQuestion}
              onChange={(e) =>
                setData({ ...data, basicQuestion: e.target.value })
              }
              placeholder="내가 궁금한 점을 질문으로 써 보세요."
            />
          </label>
        </section>

        <section className="panel">
          <QBot>
            질문은 정답을 바로 찾기 위한 문장이 아니라, 더 알아보고 싶은
            궁금증에서 시작합니다. “왜?”, “어떻게?”, “무엇이 달라질까?”를
            떠올려 보세요.
          </QBot>

          <div className="summary-box">
            <strong>작성 도움말</strong>
            <br />
            좋은 질문은 주제와 관련이 있고, 실제로 탐구할 수 있으며, 더 깊은
            생각으로 이어질 수 있습니다.
          </div>
        </section>
      </div>
    </>
  );
}

function DStage({ data, setData }) {
  const stage = stages[1];

  const selected = deepeningStrategies.find(
    (strategy) => strategy.title === data.strategy
  );

  return (
    <>
      <SectionHeader
        stage={stage}
        step="2"
        title="Q봇을 활용해 질문을 심화해 보세요"
        description="WHY, IF, 비교, 관점, 결과, 가치 전략을 활용하여 나의 질문을 깊이 있게 만듭니다."
      />

      <div className="panel-grid">
        <section className="panel">
          <div className="field-title">질문 심화 전략</div>
          <div className="option-grid">
            {deepeningStrategies.map((strategy) => (
              <button
                key={strategy.key}
                className={
                  data.strategy === strategy.title
                    ? "option-button selected"
                    : "option-button"
                }
                onClick={() =>
                  setData({ ...data, strategy: strategy.title })
                }
              >
                <div className="option-main">{strategy.title}</div>
                <div className="option-sub">{strategy.subtitle}</div>
                <div className="option-guide">{strategy.guide}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <QBot>
            {selected
              ? `${selected.title} 전략을 선택했습니다. ${selected.guide} Q봇은 질문을 대신 만들어 주지 않고, 스스로 질문을 깊게 만들 수 있도록 도와줍니다.`
              : "질문 심화 전략을 하나 선택해 보세요. Q봇은 답을 알려주기보다 스스로 질문을 깊게 만들 수 있도록 도와줍니다."}
          </QBot>

          <div className="field-title">현재 질문</div>
          <div className="summary-box">
            {data.basicQuestion || "Q 단계에서 만든 질문이 여기에 표시됩니다."}
          </div>

          <label className="field" style={{ marginTop: "18px" }}>
            <div className="field-title">심화된 질문</div>
            <textarea
              value={data.deepenedQuestion}
              onChange={(e) =>
                setData({ ...data, deepenedQuestion: e.target.value })
              }
              placeholder="선택한 전략을 활용해 질문을 더 깊게 바꾸어 써 보세요."
            />
          </label>
        </section>
      </div>
    </>
  );
}

function IStage({ data, setData }) {
  const stage = stages[2];

  return (
    <>
      <SectionHeader
        stage={stage}
        step="3"
        title="탐구방법을 선택하세요"
        description="내 질문을 해결하는 데 알맞은 탐구방법을 고르고 계획을 세웁니다."
      />

      <div className="panel-grid">
        <section className="panel">
          <div className="field-title">탐구방법</div>
          <div className="option-grid">
            {inquiryMethods.map((method) => (
              <button
                key={method}
                className={
                  data.method === method
                    ? "option-button selected"
                    : "option-button"
                }
                onClick={() => setData({ ...data, method })}
              >
                <div className="option-main">{method}</div>
              </button>
            ))}
          </div>

          <label className="field" style={{ marginTop: "18px" }}>
            <div className="field-title">탐구방법 선택 이유</div>
            <textarea
              value={data.methodReason}
              onChange={(e) =>
                setData({ ...data, methodReason: e.target.value })
              }
              placeholder="왜 이 탐구방법이 내 질문에 알맞다고 생각하나요?"
            />
          </label>
        </section>

        <section className="panel">
          <QBot>
            사람들의 생각이 궁금하면 인터뷰나 설문, 변화나 모습을 살펴보려면
            관찰, 자료 속 관계를 보려면 자료 분석이 도움이 됩니다.
          </QBot>

          <div className="field-title">탐구 질문</div>
          <div className="summary-box">
            {data.deepenedQuestion ||
              data.basicQuestion ||
              "나의 질문이 여기에 표시됩니다."}
          </div>

          <label className="field" style={{ marginTop: "18px" }}>
            <div className="field-title">탐구 계획</div>
            <textarea
              value={data.plan}
              onChange={(e) => setData({ ...data, plan: e.target.value })}
              placeholder="무엇을 조사하고, 어떤 자료를 모으며, 어떻게 정리할지 써 보세요."
            />
          </label>
        </section>
      </div>
    </>
  );
}

function VStage({ data, setData }) {
  const stage = stages[3];

  const checks = [
    ["curiosity", "내가 정말 궁금한 질문인가요?"],
    ["relevance", "주제와 관련이 있는 질문인가요?"],
    ["feasibility", "실제로 탐구할 수 있는 질문인가요?"],
    ["expansion", "생각을 더 넓혀 주는 질문인가요?"],
    ["sharing", "친구들과 나눌 가치가 있는 질문인가요?"],
  ];

  const score = Object.values(data.verification).filter(Boolean).length;

  return (
    <>
      <SectionHeader
        stage={stage}
        step="4"
        title="질문을 검증하세요"
        description="내 질문이 탐구할 만한 가치와 가능성을 지녔는지 점검합니다."
      />

      <div className="panel-grid">
        <section className="panel">
          <div className="field-title">점검할 질문</div>
          <div className="summary-box">
            {data.deepenedQuestion ||
              data.basicQuestion ||
              "점검할 질문이 여기에 표시됩니다."}
          </div>

          <div className="check-list" style={{ marginTop: "18px" }}>
            {checks.map(([key, label]) => (
              <label key={key} className="check-item">
                <input
                  type="checkbox"
                  checked={data.verification[key]}
                  onChange={(e) =>
                    setData({
                      ...data,
                      verification: {
                        ...data.verification,
                        [key]: e.target.checked,
                      },
                    })
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="panel">
          <QBot>
            현재 질문 점검 결과는 {score}/5입니다. 부족한 부분은 질문을 더
            구체화하거나 탐구방법을 다시 조정해 보세요.
          </QBot>

          <label className="field">
            <div className="field-title">점검 후 생각</div>
            <textarea
              value={data.verificationNote}
              onChange={(e) =>
                setData({ ...data, verificationNote: e.target.value })
              }
              placeholder="내 질문의 좋은 점, 보완할 점, 다시 생각한 점을 써 보세요."
            />
          </label>

          <label className="field">
            <div className="field-title">최종 질문</div>
            <textarea
              value={data.finalQuestion}
              onChange={(e) =>
                setData({ ...data, finalQuestion: e.target.value })
              }
              placeholder="점검한 내용을 바탕으로 최종 질문을 써 보세요."
            />
          </label>
        </section>
      </div>
    </>
  );
}

function EStage({ data, setData }) {
  const stage = stages[4];

  return (
    <>
      <SectionHeader
        stage={stage}
        step="5"
        title="질문과 탐구 과정을 공유하세요"
        description="내 질문이 어떻게 발전했는지 정리하고 친구들과 나눕니다."
      />

      <div className="panel-grid">
        <section className="panel">
          <label className="field">
            <div className="field-title">공유 제목</div>
            <input
              value={data.shareTitle}
              onChange={(e) =>
                setData({ ...data, shareTitle: e.target.value })
              }
              placeholder="예: 인공지능과 미래 직업에 대한 나의 질문"
            />
          </label>

          <label className="field">
            <div className="field-title">공유할 내용</div>
            <textarea
              value={data.shareContent}
              onChange={(e) =>
                setData({ ...data, shareContent: e.target.value })
              }
              placeholder="탐구하면서 알게 된 점, 질문이 바뀐 과정, 친구에게 나누고 싶은 생각을 써 보세요."
            />
          </label>
        </section>

        <section className="panel">
          <QBot>
            공유할 때는 결과만 말하기보다 질문이 어떻게 바뀌었는지, 왜 그
            방법을 선택했는지 함께 말하면 좋습니다.
          </QBot>

          <div className="summary-box">
            <strong>미리보기</strong>
            <br />
            <br />
            <strong>처음 질문:</strong> {data.basicQuestion || "-"}
            <br />
            <strong>심화 질문:</strong> {data.deepenedQuestion || "-"}
            <br />
            <strong>최종 질문:</strong> {data.finalQuestion || "-"}
            <br />
            <strong>탐구방법:</strong> {data.method || "-"}
            <br />
            <strong>탐구 계획:</strong> {data.plan || "-"}
            <br />
            <strong>공유 제목:</strong> {data.shareTitle || "-"}
          </div>
        </section>
      </div>
    </>
  );
}

function App() {
  const savedData = (() => {
    try {
      const saved = localStorage.getItem("q-dive-data");
      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  })();

  const [currentStageKey, setCurrentStageKey] = useState("MAIN");
  const [data, setData] = useState(savedData);

  const currentIndex = stages.findIndex((stage) => stage.key === currentStageKey);
  const currentStage = stages[currentIndex];

  const saveData = () => {
    localStorage.setItem("q-dive-data", JSON.stringify(data));
    alert("현재 작성 내용이 이 브라우저에 저장되었습니다.");
  };

  const resetData = () => {
    const ok = window.confirm("작성한 내용을 모두 지울까요?");
    if (!ok) return;

    setData(initialData);
    localStorage.removeItem("q-dive-data");
  };

  const goPrev = () => {
    if (currentStageKey === "MAIN") return;

    if (currentIndex === 0) {
      setCurrentStageKey("MAIN");
      return;
    }

    setCurrentStageKey(stages[currentIndex - 1].key);
  };

  const goNext = () => {
    if (currentStageKey === "MAIN") {
      setCurrentStageKey("Q");
      return;
    }

    if (currentIndex < stages.length - 1) {
      setCurrentStageKey(stages[currentIndex + 1].key);
    }
  };

  if (currentStageKey === "MAIN") {
    return <StartPage setCurrentStageKey={setCurrentStageKey} />;
  }

  return (
    <div className="app">
      <div className="workspace">
        <Sidebar
          currentStageKey={currentStageKey}
          setCurrentStageKey={setCurrentStageKey}
        />

        <main className="main">
          <Topbar
            currentStage={currentStage}
            setCurrentStageKey={setCurrentStageKey}
            saveData={saveData}
            resetData={resetData}
          />

          <div className="content">
            {currentStageKey === "Q" && (
              <QStage data={data} setData={setData} />
            )}
            {currentStageKey === "D" && (
              <DStage data={data} setData={setData} />
            )}
            {currentStageKey === "I" && (
              <IStage data={data} setData={setData} />
            )}
            {currentStageKey === "V" && (
              <VStage data={data} setData={setData} />
            )}
            {currentStageKey === "E" && (
              <EStage data={data} setData={setData} />
            )}

            <div className="footer-nav">
              <button className="btn secondary" onClick={goPrev}>
                이전
              </button>

              {currentIndex < stages.length - 1 ? (
                <button className="btn" onClick={goNext}>
                  다음
                </button>
              ) : (
                <button className="btn teal" onClick={saveData}>
                  공유 내용 저장하기
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

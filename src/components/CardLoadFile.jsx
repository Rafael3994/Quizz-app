import useCardLoadFile from '../hooks/useCardLoadFile';

export default function CardLoadFile({setQuestions, setCurrentQuestionIndex}) {
    const {
        dragging,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        fileInputRef,
        handleFileUpload,
        triggerFileSelect,
    } = useCardLoadFile({
        setQuestions, 
        setCurrentQuestionIndex
    });

    return (
        <section className="card">
            <div className="card-header">
                <h1 className="card-title">Cuestionario de Verdadero/Falso</h1>
                <p className="card-description">Carga un archivo JSON con tus preguntas para comenzar</p>
            </div>
            <div className="card-content">
                <div
                    className={`file-upload-area ${dragging ? 'dragging' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <p className="upload-text">
                        Arrastra y suelta tu archivo JSON o haz clic para seleccionarlo
                    </p>

                    <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />

                    <button type="button" onClick={triggerFileSelect} className="button button-outline">
                        Seleccionar archivo
                    </button>
                </div>
            </div>
            <div className="card-footer">
                <p className="json-format-text">El archivo JSON debe tener el formato:</p>
                <pre className="json-example">
                    {JSON.stringify(
                        [
                            {
                                "question": "¿La Tierra es redonda?",
                                "answer": true,
                                "explanation": "Aunque la Tierra no es una esfera perfecta, tiene una forma aproximadamente redonda (geoide), ligeramente achatada en los polos debido a su rotación."
                            },
                            {
                                "question": "¿Existen más de dos sexos biológicos en los seres humanos?",
                                "answer": false,
                                "explanation": "Biológicamente, la mayoría de los seres humanos se clasifican como varones (XY) o hembras (XX). Existen casos raros de intersexualidad, pero no constituyen sexos biológicos adicionales definidos."
                            }
                        ],
                        null,
                        2,
                    )}
                </pre>
            </div>
        </section>
    );
}
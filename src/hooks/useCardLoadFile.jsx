import { useRef, useState } from 'react';

export default function useCardLoadFile ({setQuestions, setCurrentQuestionIndex}) {
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    function radomizeShuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    const handleFile = (file) => {
        if (!file) return
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result)
                setQuestions(radomizeShuffleArray(json))
                setCurrentQuestionIndex(0)
            } catch (error) {
                alert("Error al cargar el archivo JSON. Asegúrate de que el formato sea correcto.")
            }
        }
        reader.readAsText(file)
    }

    function triggerFileSelect() {
        fileInputRef.current?.click();
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        handleFile(file);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }

    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave() {
        setDragging(false);
    }

    return {
        dragging,
        fileInputRef,
        handleDrop,
        handleDragOver,
        handleDragLeave,
        handleFileUpload,
        triggerFileSelect
    };
}
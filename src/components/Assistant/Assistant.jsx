import { useEffect, useState } from "react";
import { Assistant as OpenAIAssistant } from "../../assistants/openai";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai";
import styles from "./Assistant.module.css";

const assistantMap = {
    googleai: GoogleAIAssistant,
    openai: OpenAIAssistant,
};

export function Assistant({ onAssistantChange }) {
    const [value, setValue] = useState("openai:gpt-4o-mini");

    function handleValueChange(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        const [assistant, model] = value.split(":");
        const AssistantClass = assistantMap[assistant];

        if (!AssistantClass) {
            throw new Error(`Unknown assistant: ${assistant} or model: ${model}`);
        }

        onAssistantChange(new AssistantClass(model));
    }, [value]);

    return (
        <div className={styles.Assistant}>
            <span>Assistant:</span>
            <select value={value} onChange={handleValueChange}>
                <option value="openai:gpt-4o-mini">GPT-4o mini</option>
            </select>
        </div>
    );
}
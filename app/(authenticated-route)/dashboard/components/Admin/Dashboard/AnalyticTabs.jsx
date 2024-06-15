import { AnalyticWordsCount } from "@/data/analytics/analytics";
import Tabs from "./TabsComponent";
import DictionaryPlays from "./components/DictionaryPlays";
import TranslationAnalytics from "./components/TranslationAnalytics";
import { TranslationCounts } from "@/data/analytics/translation-analytics";

export default async function Analytics() {
    const tabs = ["Translation Content", "Dictionary Plays"];
    const wordAnalytics = await AnalyticWordsCount(new Date().getMonth() + 1, new Date().getFullYear());
    const translationAnalytics = await TranslationCounts();

    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-xl p-8 shadow-md h-full">
            <Tabs tabs={tabs} defaultTab="Translation Content">
                {{
                    "Translation Content": (
                        <TranslationAnalytics translationData={translationAnalytics} />
                    ),
                    "Dictionary Plays": (
                        <DictionaryPlays analytics={wordAnalytics} />
                    ),
                }}
            </Tabs>
        </div>
    );
}

"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import DecisionList from "./_components/decisionsList"

type TabValue = 'decisions' | 'cases' | null

export default function Home() {
  const [currentTab, setCurrentTab] = useState<TabValue>(null)
  const [isDecisionLoading, setIsDecisionLoading] = useState(false)
  const [decisionData, setDecisionData] = useState<DecisionItem[]>(null!)

  const fetchDecisions = async () => {
    if (currentTab != 'decisions') {
      setCurrentTab('decisions')
      setIsDecisionLoading(true)
      const res = await fetch('/api/putusan')
      const json = await res.json() as any
      const data = json.data as DecisionItem[]
      setDecisionData(data)
      setIsDecisionLoading(false)
    }
  }

  const fetchCases = async () => {
    if (currentTab != 'cases') {
      setCurrentTab('cases')
    }
  }

  return (
    <main className="py-24 px-5 md:px-10 lg:px-24 min-h-screen">
      {/* HEADER */}
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center mb-14">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Courts decision and cases data collection
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-40 dark:text-gray-400">
            This is a proof of concept for collecting decisions and cases data from the Courts
          </p>
        </div>

        {/* Buttons */}
        <div className="text-center mb-10">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={fetchDecisions}
              type="button"
              className={
                cn([
                  'px-4 py-2 w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white',
                  currentTab == 'decisions' && 'bg-blue-700 text-white focus:text-white focus:bg-blue-700',
                ])
              }
            >
              Collect Decisisions data
            </button>
            <button onClick={fetchCases} type="button" className="px-4 py-2 w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Collect Cases data
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      { currentTab == 'decisions' && <DecisionList isLoading={isDecisionLoading} items={decisionData} /> }

    </main>
  )
}

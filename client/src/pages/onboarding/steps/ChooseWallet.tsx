import type { Wallet } from '../../../slices/types'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { isBrowser } from 'react-device-detect'

import { fadeX, rowContainer } from '../../../FramerAnimations'
import { useWallets } from '../../../slices/wallets/walletsSelectors'
import { StepInformation } from '../components/StepInformation'
import { WalletItem } from '../components/WalletItem'
import { WalletModal } from '../components/WalletModal'

export interface Props {
  title: string
  text: string
  addOnboardingProgress(): void
}

export const ChooseWallet: React.FC<Props> = ({ title, text, addOnboardingProgress }) => {
  const { wallets } = useWallets()

  const [isChooseWalletModalOpen, setIsChooseWalletModalOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined)

  const openWalletModal = (id: number) => {
    setSelectedWallet(wallets.find((item) => item.id === id) || undefined)
    setIsChooseWalletModalOpen(true)
  }

  const renderWallets = wallets.map((wallet) => {
    return (
      <div key={wallet.id} onClick={() => openWalletModal(wallet.id)}>
        <WalletItem
          name={wallet.name}
          icon={wallet.icon}
          organization={wallet.organization}
          recommended={wallet.recommended}
        />
      </div>
    )
  })

  const onCompleted = () => {
    setIsChooseWalletModalOpen(false)

    setTimeout(function () {
      addOnboardingProgress()
    }, 300)
  }

  const style = isBrowser ? { marginBottom: '1rem', maxHeight: '35vh' } : { maxHeight: '34vh' }

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation title={title} text={text} />
      <motion.div
        className="flex flex-col md:px-4 h-full max-h-96 overflow-x-hidden"
        variants={rowContainer}
        initial="hidden"
        animate="show"
        exit="exit"
        style={style}
      >
        {renderWallets}
      </motion.div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {selectedWallet && (
          <WalletModal
            isWalletModalOpen={isChooseWalletModalOpen}
            setIsWalletModalOpen={setIsChooseWalletModalOpen}
            wallet={selectedWallet}
            onCompleted={onCompleted}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

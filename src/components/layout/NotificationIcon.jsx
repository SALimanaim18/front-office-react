"use client"

import { useState, useEffect, useRef } from "react"
import { BellRing, Check, X, ChevronRight, Clock } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Link } from "react-router-dom"
import {
  getUnseenNotifications,
  countUnseenNotifications,
  markNotificationAsSeen,
  markAllNotificationsAsSeen
} from "../../services/api/notificationApi"

export const NotificationIcon = ({ userId }) => {
  const [unseenCount, setUnseenCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const fetchUnseenCount = async () => {
      try {
        if (userId) {
          const count = await countUnseenNotifications(userId)
          setUnseenCount(count)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des notifications non lues:", error)
      }
    }

    fetchUnseenCount()
    
    // Rafraîchir le compteur toutes les 30 secondes
    const intervalId = setInterval(fetchUnseenCount, 30000)
    
    return () => clearInterval(intervalId)
  }, [userId])

  const toggleNotificationPanel = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="relative group">
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-gray-100 flex items-center justify-center"
          onClick={toggleNotificationPanel}
          aria-label="Notifications"
        >
          <BellRing size={22} className="text-gray-700 group-hover:text-[#d93f31] transition-colors" />
          {unseenCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#d93f31] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {unseenCount > 9 ? '9+' : unseenCount}
              </span>
            </span>
          )}
        </button>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Notifications
        </div>
      </div>

      {isOpen && <NotificationsPanel userId={userId} onClose={handleClose} setUnseenCount={setUnseenCount} />}
    </div>
  )
}

// Composant pour formater la date de manière relative
const TimeAgo = ({ timestamp }) => {
  try {
    const date = new Date(timestamp)
    const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: fr })
    
    return (
      <span title={format(date, "PPpp", { locale: fr })} className="text-xs text-gray-500 flex items-center">
        <Clock size={12} className="mr-1" />
        {timeAgo}
      </span>
    )
  } catch (error) {
    return <span className="text-xs text-gray-500">Date inconnue</span>
  }
}

// Composant pour une notification individuelle
const NotificationItem = ({ notification, onMarkAsSeen }) => {
  const handleMarkAsSeen = async (e) => {
    e.stopPropagation()
    if (!notification.seen) {
      await onMarkAsSeen(notification.id)
    }
  }

  return (
    <div 
      className={`p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer flex items-start ${notification.seen ? 'bg-white' : 'bg-blue-50'}`}
      onClick={handleMarkAsSeen}
    >
      <div className="flex-grow">
        <p className="text-sm text-gray-800">{notification.message}</p>
        <TimeAgo timestamp={notification.timestamp} />
      </div>
      {!notification.seen && (
        <button 
          onClick={handleMarkAsSeen}
          className="ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 transition-colors"
          aria-label="Marquer comme lu"
        >
          <Check size={16} />
        </button>
      )}
    </div>
  )
}

// Composant pour le panneau de notifications
const NotificationsPanel = ({ userId, onClose, setUnseenCount }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const data = await getUnseenNotifications(userId)
        setNotifications(data)
        setLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des notifications:", error)
        setError("Impossible de charger les notifications")
        setLoading(false)
      }
    }

    if (userId) {
      fetchNotifications()
    }
  }, [userId])

  // Fermer le panneau quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleMarkAsSeen = async (notificationId) => {
    try {
      await markNotificationAsSeen(notificationId)
      
      // Mettre à jour l'état local
      setNotifications(notifications.map(notif => 
        notif.id === notificationId ? { ...notif, seen: true } : notif
      ))
      
      // Mettre à jour le compteur
      const updatedCount = await countUnseenNotifications(userId)
      setUnseenCount(updatedCount)
    } catch (error) {
      console.error("Erreur lors du marquage de la notification:", error)
    }
  }

  const handleMarkAllAsSeen = async () => {
    try {
      await markAllNotificationsAsSeen(userId)
      
      // Mettre à jour l'état local
      setNotifications(notifications.map(notif => ({ ...notif, seen: true })))
      setUnseenCount(0)
    } catch (error) {
      console.error("Erreur lors du marquage de toutes les notifications:", error)
    }
  }

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 4)

  return (
    <div 
      ref={panelRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200"
      style={{ maxHeight: '80vh' }}
    >
      <div className="flex items-center justify-between bg-gray-50 border-b px-4 py-2">
        <h3 className="font-medium text-gray-700">Notifications</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMarkAllAsSeen}
            className="text-sm text-blue-600 hover:text-blue-800"
            disabled={loading || notifications.every(n => n.seen)}
          >
            Tout marquer comme lu
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Chargement...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Aucune notification</div>
        ) : (
          <>
            {displayedNotifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsSeen={handleMarkAsSeen} 
              />
            ))}
          </>
        )}
      </div>
      
      {!showAll && notifications.length > 4 && (
        <button 
          onClick={() => setShowAll(true)}
          className="w-full py-2 bg-gray-50 text-[#d93f31] hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center"
        >
          Voir toutes les notifications ({notifications.length})
          <ChevronRight size={16} className="ml-1" />
        </button>
      )}
      
      {showAll && (
        <Link 
          to="/notifications"
          className="block w-full py-2 bg-gray-50 text-center text-[#d93f31] hover:bg-gray-100 transition-colors text-sm font-medium"
          onClick={onClose}
        >
          Gérer toutes les notifications
        </Link>
      )}
    </div>
  )
}

export default NotificationIcon
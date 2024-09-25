interface StatusItem {
  id: number;
  jenis_transaksi_id: number;
  jenis_transaksi_label: string;
  status: string;
  keterangan: string;
}

interface StatusType {
  [key: number]: {
    [key: string]: StatusItem;
  };
}

export const statusEnum: StatusType = {
  1: {
    "Ordered": {
      "id": 1,
      "jenis_transaksi_id": 1,
      "jenis_transaksi_label": "Stock In",
      "status": "Ordered",
      "keterangan": "Barang sedang dalam proses pemesanan"
    },
    "Pending": {
      "id": 2,
      "jenis_transaksi_id": 1,
      "jenis_transaksi_label": "Stock In",
      "status": "Pending",
      "keterangan": "Barang dalam proses pengiriman"
    },
    "Received": {
      "id": 3,
      "jenis_transaksi_id": 1,
      "jenis_transaksi_label": "Stock In",
      "status": "Received",
      "keterangan": "Barang sudah di terima oleh pihak warehouse"
    },
  },
  2: {
    "Draft": {
      "id": 4,
      "jenis_transaksi_id": 2,
      "jenis_transaksi_label": "Stock Opname",
      "status": "Draft",
      "keterangan": "Draft sebelum melakukan Proses Stock Opname"
    },
    "Completed": {
      "id": 5,
      "jenis_transaksi_id": 2,
      "jenis_transaksi_label": "Stock Opname",
      "status": "Completed",
      "keterangan": "Proses Stock Opname selalu dinyatakan berhasil"
    },
  },
  3: {
    "Draft": {
      "id": 6,
      "jenis_transaksi_id": 3,
      "jenis_transaksi_label": "Transfer Stock",
      "status": "Draft",
      "keterangan": "Draft form sebelum melakukan Transfer Stock"
    },
    "Sent": {
      "id": 7,
      "jenis_transaksi_id": 3,
      "jenis_transaksi_label": "Transfer Stock",
      "status": "Sent",
      "keterangan": "Proses Transfer stock sedang dalam proses pengiriman"
    },
    "Completed": {
      "id": 8,
      "jenis_transaksi_id": 3,
      "jenis_transaksi_label": "Transfer Stock",
      "status": "Completed",
      "keterangan": "Proses Transfer stock telah berhasil"
    },
  },
  5: {
    "Ordered": {
      "id": 9,
      "jenis_transaksi_id": 5,
      "jenis_transaksi_label": "Sale",
      "status": "Ordered",
      "keterangan": "Penjualan / Barang keluar baru saja di order namun belum selesai transaksinya"
    },
    "Pending": {
      "id": 10,
      "jenis_transaksi_id": 5,
      "jenis_transaksi_label": "Sale",
      "status": "Pending",
      "keterangan": "Penjualan / Barang keluar tertunda"
    },
    "Completed": {
      "id": 11,
      "jenis_transaksi_id": 5,
      "jenis_transaksi_label": "Sale",
      "status": "Completed",
      "keterangan": "Penjualan / Barang keluar sudah dilakukan"
    },
  },
  6: {
    "Waiting for Approval": {
      "id": 12,
      "jenis_transaksi_id": 6,
      "jenis_transaksi_label": "Write Off",
      "status": "Waiting for Approval",
      "keterangan": "Proses penghapusan stock dalam proses approval"
    },
    "Approved": {
      "id": 13,
      "jenis_transaksi_id": 6,
      "jenis_transaksi_label": "Write Off",
      "status": "Approved",
      "keterangan": "Proses Transfer Stock di setujui oleh Manager"
    },
    "Rejected": {
      "id": 14,
      "jenis_transaksi_id": 6,
      "jenis_transaksi_label": "Write Off",
      "status": "Rejected",
      "keterangan": "Proses Penghapusan stock di tolak oleh Manager"
    }
  }
}